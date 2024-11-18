import { Album } from 'src/album/types/album.types';
import { Artist } from 'src/artist/types/artist.types';
import { Track } from 'src/track/types/track.types';

export type ResponseFavorites = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
