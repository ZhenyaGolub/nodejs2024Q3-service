import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DbModule } from 'src/db/db.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [DbModule, FavsModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
