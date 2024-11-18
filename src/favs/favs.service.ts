import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Favorites, ResponseFavorites } from './types/favs.types';
import { validate } from 'uuid';

import { DbService } from 'src/db/db.service';
import { ResponseFavorites } from './types/favs.types';
@Injectable()
export class FavsService {
  constructor(private readonly dbService: DbService) {}

  async getAll() {
    const favorites = await this.dbService.favorites.findMany();
    const artists = await this.dbService.artist.findMany();
    const albums = await this.dbService.album.findMany();
    const tracks = await this.dbService.track.findMany();
    const responseFavorites = Object.entries(favorites[0] || {}).reduce(
      (accumulator, [key, ids]) => {
        let items = [];
        switch (key) {
          case 'artists':
            items = artists.filter(({ id }) => ids.includes(id));
            break;
          case 'albums':
            items = albums.filter(({ id }) => ids.includes(id));
            break;
          case 'tracks':
            items = tracks.filter(({ id }) => ids.includes(id));
            break;
          default:
            break;
        }
        return { ...accumulator, [key]: items };
      },
      { artists: [], albums: [], tracks: [], id: [] },
    );
    const { id, ...props } = responseFavorites;
    return props;
  }

  async addTrack(id: string) {
    const foundedTrack = await this.dbService.track.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.addItem('tracks', id);

    return { message: 'Track has been successfully added to favorites' };
  }

  async deleteTrack(id: string) {
    const foundedTrackId = await this.dbService.favorites.findUnique({
      where: { id: '1', tracks: { has: id } },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrackId) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    await this.removeItem('tracks', id);
    return { message: 'Track has been successfully removed from favorites' };
  }

  async addAlbum(id: string) {
    const foundedAlbum = await this.dbService.album.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.addItem('albums', id);
    return { message: 'Album has been successfully added to favorites' };
  }

  async deleteAlbum(id: string) {
    const foundedAlbumId = await this.dbService.favorites.findUnique({
      where: { id: '1', albums: { has: id } },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbumId) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    await this.removeItem('albums', id);
    return { message: 'Album has been successfully removed from favorites' };
  }

  async addArtist(id: string) {
    const foundedArtist = await this.dbService.artist.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.addItem('artists', id);
    return { message: 'Artist has been successfully added to favorites' };
  }

  async deleteArtist(id: string) {
    const foundedArtistId = await this.dbService.favorites.findUnique({
      where: { id: '1', artists: { has: id } },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtistId) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    await this.removeItem('artists', id);
    return { message: 'Artist has been successfully removed from favorites' };
  }

  async addItem(key: keyof ResponseFavorites, id: string) {
    const favorites = await this.dbService.favorites.findMany();
    if (favorites.length) {
      await this.dbService.favorites.update({
        where: { id: favorites[0].id },
        data: { [key]: favorites[0][key] ? [...favorites[0][key], id] : [id] },
      });
    } else {
      await this.dbService.favorites.create({
        data: {
          id: '1',
          [key]: [id],
        },
      });
    }
  }

  async removeItem(key: keyof ResponseFavorites, id: string) {
    const favorites = await this.dbService.favorites.findMany();

    await this.dbService.favorites.update({
      where: { id: favorites[0].id },
      data: { [key]: favorites[0][key].filter((itemId) => itemId !== id) },
    });
  }
}
