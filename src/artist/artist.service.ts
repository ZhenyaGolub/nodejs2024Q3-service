import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist, CreateArtist } from './types/artist.types';
import { v4, validate } from 'uuid';

@Injectable()
export class ArtistService {
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

    this.artists = this.artists.filter(({ id }) => id !== foundedArtist.id);
  }

  findArtist(artistId: string) {
    return this.artists.find(({ id }) => id === artistId);
  }
}
