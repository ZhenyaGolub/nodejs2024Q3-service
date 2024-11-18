import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { v4, validate } from 'uuid';

import { CreateArtist } from './types/artist.types';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

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
    // Think about this part
    await this.dbService.artist.delete({
      where: { id },
    });
  }
}
