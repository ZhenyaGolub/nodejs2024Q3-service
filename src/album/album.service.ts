import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4, validate } from 'uuid';

import { Album, ValidatedAlbum } from './types/album.types';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { CreateTrack } from 'src/track/types/track.types';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}
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
      ...updateAlbumDto,
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

    this.trackService.deleteId('albumId', id);
    this.albums = this.albums.filter(({ id }) => id !== foundedAlbum.id);
  }

  findAlbum(abumId: string) {
    return this.albums.find(({ id }) => id === abumId);
  }

  deleteId(key: 'artistId', id: string) {
    const album = this.albums.find((track) => track[key] === id);
    if (album) {
      this.update({ [key]: null } as ValidatedAlbum, album.id);
    }
  }
}
