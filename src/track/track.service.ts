import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrack, Track } from './types/track.types';
import { v4, validate } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAll() {
    return this.tracks;
  }

  getOne(id: string) {
    const foundedTrack = this.findTrack(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    return foundedTrack;
  }

  create({ artistId, albumId, ...props }: CreateTrack) {
    const newTrack = {
      ...props,
      artistId: artistId || null,
      albumId: albumId || null,
      id: v4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(updateTrackDto: CreateTrack, id: string) {
    const foundedTrack = this.findTrack(id);

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = {
      ...foundedTrack,
      ...updateTrackDto,
    };
    this.tracks = [
      ...this.tracks.filter(({ id }) => id !== foundedTrack.id),
      updatedTrack,
    ];
    return updatedTrack;
  }

  delete(trackId: string) {
    const foundedTrack = this.findTrack(trackId);

    if (!validate(trackId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    this.tracks = this.tracks.filter(({ id }) => id !== trackId);
  }

  findTrack(trackId: string) {
    return this.tracks.find(({ id }) => id === trackId);
  }

  deleteId(key: 'artistId' | 'albumId', id: string) {
    const track = this.tracks.find((track) => track[key] === id);
    if (track) {
      this.update({ [key]: null } as CreateTrack, track.id);
    }
  }
}
