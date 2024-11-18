import { Favorites } from '@prisma/client';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ResponseFavorites } from './types/favs.types';
// import { Favorites, ResponseFavorites } from './types/favs.types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll(): Promise<ResponseFavorites> {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  deleteTrack(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string): Promise<{ message: string }> {
    return this.favsService.deleteArtist(id);
  }
}
