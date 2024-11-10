import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist, CreateArtist } from './types/artist.types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Artist {
    return this.artistService.getOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtist): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Body() updateArtistDto: CreateArtist,
    @Param('id') id: string,
  ): Artist {
    return this.artistService.update(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
