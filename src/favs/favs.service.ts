import { Injectable } from '@nestjs/common';
import { Favorites } from './types/favs.types';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(private readonly trackService: TrackService) {}
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return this.favs;
  }

  addTrack(trackId: string) {
    return '';
  }
}
