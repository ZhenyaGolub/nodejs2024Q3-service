import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';

import { ValidatedAlbum } from './types/album.types';
import { DbService } from 'src/db/db.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly dbService: DbService,
    private readonly favsService: FavsService,
  ) {}

  async getAll() {
    return await this.dbService.album.findMany();
  }

  async getOne(id: string) {
    const foundedAlbum = await this.dbService.album.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    return foundedAlbum;
  }

  async create({ artistId, ...props }: ValidatedAlbum) {
    const newAlbum = await this.dbService.album.create({
      data: {
        ...props,
        artistId: artistId || null,
        id: v4(),
      },
    });
    return newAlbum;
  }

  async update(updateAlbumDto: ValidatedAlbum, id: string) {
    const foundedAlbum = await this.dbService.album.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    const updatedAlbum = await this.dbService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return updatedAlbum;
  }

  async delete(id: string) {
    const foundedAlbum = await this.dbService.album.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    const foundedFavoritesAlbum = await this.dbService.favorites.findUnique({
      where: { id: '1', albums: { has: id } },
    });
    if (foundedFavoritesAlbum) {
      await this.favsService.removeItem('albums', id);
    }
    await this.dbService.album.delete({
      where: { id },
    });
  }
}
