import { IsNotEmpty, IsNumber } from 'class-validator';

export type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export class ValidatedAlbum {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  artistId: string | null;
}
