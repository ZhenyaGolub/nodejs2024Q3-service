import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DbModule],
  exports: [FavsService],
})
export class FavsModule {}
