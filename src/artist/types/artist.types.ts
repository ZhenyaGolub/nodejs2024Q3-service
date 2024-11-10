import { IsNotEmpty, IsBoolean } from 'class-validator';

export type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

export class CreateArtist {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
