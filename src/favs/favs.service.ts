import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorites, ResponseFavorites } from './types/favs.types';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return Object.entries(this.favs).reduce<ResponseFavorites>(
      (accumulator, [key, ids]) => {
        let items = [];
        switch (key) {
          case 'artists':
            items = this.artistService
              .getAll()
              .filter(({ id }) => ids.includes(id));
            break;
          case 'albums':
            items = this.albumService
              .getAll()
              .filter(({ id }) => ids.includes(id));
            break;
          case 'tracks':
            items = this.trackService
              .getAll()
              .filter(({ id }) => ids.includes(id));
            break;
          default:
            break;
        }
        return { ...accumulator, [key]: items };
      },
      { artists: [], albums: [], tracks: [] },
    );
  }

  addTrack(id: string) {
    const foundedTrack = this.trackService.findTrack(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favs.tracks.push(foundedTrack.id);
    return { message: 'Track has been successfully added to favorites' };
  }

  deleteTrack(id: string) {
    const foundedTrackId = this.find('tracks', id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrackId) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    this.favs.tracks = this.favs.tracks.filter((id) => id !== foundedTrackId);
    return { message: 'Track has been successfully removed from favorites' };
  }

  addAlbum(id: string) {
    const foundedAlbum = this.albumService.findAlbum(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favs.albums.push(foundedAlbum.id);
    return { message: 'Album has been successfully added to favorites' };
  }

  deleteAlbum(id: string) {
    const foundedAlbumId = this.find('albums', id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbumId) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    this.favs.albums = this.favs.albums.filter((id) => id !== foundedAlbumId);
    return { message: 'Album has been successfully removed from favorites' };
  }

  addArtist(id: string) {
    const foundedArtist = this.artistService.findArtist(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favs.artists.push(foundedArtist.id);
    return { message: 'Artist has been successfully added to favorites' };
  }

  deleteArtist(id: string) {
    const foundedArtistId = this.find('artists', id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtistId) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    this.favs.artists = this.favs.artists.filter(
      (id) => id !== foundedArtistId,
    );
    return { message: 'Artist has been successfully removed from favorites' };
  }

  find(key: keyof Favorites, itemId: string) {
    return this.favs[key].find((id) => id === itemId);
  }
}
