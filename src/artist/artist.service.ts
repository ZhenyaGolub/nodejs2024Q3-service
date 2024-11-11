import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Artist, CreateArtist } from './types/artist.types';
import { v4, validate } from 'uuid';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';
import { CreateTrack } from 'src/track/types/track.types';
import { AlbumService } from 'src/album/album.service';
import { ValidatedAlbum } from 'src/album/types/album.types';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}
  private artists: Artist[] = [];

  getAll() {
    return this.artists;
  }

  getOne(id: string) {
    const foundedArtist = this.findArtist(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    return foundedArtist;
  }

  create(createArtistDto: CreateArtist) {
    const newArtist = {
      ...createArtistDto,
      id: v4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(createArtistDto: CreateArtist, id: string) {
    const foundedArtist = this.findArtist(id);
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    const updatedArtist = {
      ...foundedArtist,
      ...createArtistDto,
    };
    this.artists = [
      ...this.artists.filter(({ id }) => id !== foundedArtist.id),
      updatedArtist,
    ];
    return updatedArtist;
  }

  delete(id: string) {
    const foundedArtist = this.findArtist(id);

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedArtist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    this.favsService.deleteItem('artists', id);

    this.trackService.deleteId('artistId', id);
    this.albumService.deleteId('artistId', id);
    this.artists = this.artists.filter(({ id }) => id !== foundedArtist.id);
  }

  findArtist(artistId: string) {
    return this.artists.find(({ id }) => id === artistId);
  }
}
