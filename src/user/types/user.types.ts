import { IsNotEmpty } from 'class-validator';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

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
