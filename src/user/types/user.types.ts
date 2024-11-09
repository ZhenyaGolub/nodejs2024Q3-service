import { IsNotEmpty } from 'class-validator';

export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export class CreateUser {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

export type ReturnedUser = Omit<User, 'password'>;

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
