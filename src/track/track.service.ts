import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrack } from './types/track.types';
import { v4, validate } from 'uuid';
import { DbService } from 'src/db/db.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly dbService: DbService,
    private readonly favsService: FavsService,
  ) {}

  async getAll() {
    return this.dbService.track.findMany();
  }

  async getOne(id: string) {
    const foundedTrack = await this.dbService.track.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    return foundedTrack;
  }

  async create({ artistId, albumId, ...props }: CreateTrack) {
    const newTrack = await this.dbService.track.create({
      data: {
        ...props,
        artistId: artistId || null,
        albumId: albumId || null,
        id: v4(),
      },
    });

    return newTrack;
  }

  async update(updateTrackDto: CreateTrack, id: string) {
    const foundedTrack = await this.dbService.track.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = await this.dbService.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return updatedTrack;
  }

  async delete(trackId: string) {
    const foundedTrack = await this.dbService.track.findUnique({
      where: { id: trackId },
    });

    if (!validate(trackId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedTrack) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
    const foundedFavoritesTrack = await this.dbService.favorites.findUnique({
      where: { id: '1', tracks: { has: trackId } },
    });
    if (foundedFavoritesTrack) {
      await this.favsService.removeItem('tracks', trackId);
    }
    await this.dbService.track.delete({
      where: { id: trackId },
    });
  }
}
