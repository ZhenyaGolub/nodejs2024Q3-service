import { forwardRef, Module } from '@nestjs/common';

import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  exports: [FavsService],
})
export class FavsModule {}
