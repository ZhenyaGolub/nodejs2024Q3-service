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
import { AlbumService } from './album.service';
import { Album, ValidatedAlbum } from './types/album.types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Album {
    return this.albumService.getOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: ValidatedAlbum): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Body() updateAlbumDto: ValidatedAlbum,
    @Param('id') id: string,
  ): Album {
    return this.albumService.update(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
