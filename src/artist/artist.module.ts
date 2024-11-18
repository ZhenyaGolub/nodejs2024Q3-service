import { Module } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DbModule } from 'src/db/db.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [DbModule, FavsModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
