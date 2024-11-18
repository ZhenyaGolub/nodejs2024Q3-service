import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';

import { CreateArtist } from './types/artist.types';
import { DbService } from 'src/db/db.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly dbService: DbService,
    private readonly favsService: FavsService,
  ) {}

  async getAll() {
    return await this.dbService.artist.findMany();
  }

  async getOne(id: string) {
    const foundedArtist = await this.dbService.artist.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    return foundedArtist;
  }

  async create(createArtistDto: CreateArtist) {
    const newArtist = {
      ...createArtistDto,
      id: v4(),
    };
    const artist = await this.dbService.artist.create({ data: newArtist });
    return artist;
  }

  async update(createArtistDto: CreateArtist, id: string) {
    const foundedArtist = await this.dbService.artist.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    const updatedArtist = await this.dbService.artist.update({
      where: { id },
      data: { ...createArtistDto },
    });
    return updatedArtist;
  }

  async delete(id: string) {
    const foundedArtist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    const foundedFavoritesArtist = await this.dbService.favorites.findUnique({
      where: { id: '1', artists: { has: id } },
    });

    if (foundedFavoritesArtist) {
      await this.favsService.removeItem('artists', id);
    }

    const albumId = (await this.dbService.album.findMany()).find(
      ({ artistId }) => artistId === id,
    )?.id;
    const trackId = (await this.dbService.track.findMany()).find(
      ({ artistId }) => artistId === id,
    )?.id;

    if (albumId) {
      await this.dbService.album.update({
        where: { id: albumId },
        data: { artistId: null },
      });
    }

    if (trackId) {
      await this.dbService.track.update({
        where: { id: trackId },
        data: { artistId: null },
      });
    }

    await this.dbService.artist.delete({
      where: { id },
    });
  }
}
