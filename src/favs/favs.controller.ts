import { Controller, Get } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller()
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getHello(): string {
    return '';
  }
}
