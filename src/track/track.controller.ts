import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './types/track.types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Track {
    return this.trackService.getOne(id);
  }
}
