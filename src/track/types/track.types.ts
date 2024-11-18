import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export type Track = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

export class CreateTrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
