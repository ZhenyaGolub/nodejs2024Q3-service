import { forwardRef, Module } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
