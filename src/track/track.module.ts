import { forwardRef, Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
