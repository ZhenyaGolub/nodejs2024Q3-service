import { forwardRef, Module } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
