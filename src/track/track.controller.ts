import { Track } from '@prisma/client';
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
import { TrackService } from './track.service';
import { CreateTrack } from './types/track.types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrack): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Body() updateTrackDto: CreateTrack,
    @Param('id') id: string,
  ): Promise<Track> {
    return this.trackService.update(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
