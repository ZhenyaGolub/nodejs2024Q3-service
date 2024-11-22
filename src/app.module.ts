import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { DbModule } from './db/db.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    FavsModule,
    ArtistModule,
    AlbumModule,
    DbModule,
    AuthModule,
  ],
})
export class AppModule {}
