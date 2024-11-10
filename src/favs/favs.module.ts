import { Module } from '@nestjs/common';

import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TrackModule],
})
export class FavsModule {}
