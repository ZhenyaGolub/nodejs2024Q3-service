import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsService {
  getHello(): string {
    return 'Hello World!';
  }
}
