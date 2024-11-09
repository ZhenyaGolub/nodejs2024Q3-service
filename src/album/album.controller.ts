import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getHello(): string {
    return '';
  }
}
