import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, ValidatedAlbum } from './types/album.types';
import { v4, validate } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAll() {
    return this.albums;
  }

  getOne(id: string) {
    const foundedAlbum = this.findAlbum(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    return foundedAlbum;
  }

  create({ artistId, ...props }: ValidatedAlbum) {
    const newAlbum = {
      ...props,
      artistId: artistId || null,
      id: v4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(updateAlbumDto: ValidatedAlbum, id: string) {
    const foundedAlbum = this.findAlbum(id);

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
    const updatedAlbum = {
      ...foundedAlbum,
      updateAlbumDto,
    };
    this.albums = [
      ...this.albums.filter(({ id }) => id !== foundedAlbum.id),
      updatedAlbum,
    ];
    return updatedAlbum;
  }

  delete(id: string) {
    const foundedAlbum = this.findAlbum(id);

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedAlbum) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    this.albums = this.albums.filter(({ id }) => id !== foundedAlbum.id);
  }

  findAlbum(abumId: string) {
    return this.albums.find(({ id }) => id === abumId);
  }
}
