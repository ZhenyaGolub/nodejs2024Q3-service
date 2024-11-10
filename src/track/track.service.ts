import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from './types/track.types';
import { validate } from 'uuid';

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

  findTrack(trackId: string) {
    return this.tracks.find(({ id }) => id === trackId);
  }
}
