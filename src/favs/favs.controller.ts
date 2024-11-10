import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { Favorites } from './types/favs.types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll(): Favorites {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): string {
    return this.favsService.addTrack(id);
  }
}
