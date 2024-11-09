import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';
import { CreateUser, UpdatePassword, User } from './types/user.types';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(userId: string) {
    const foundedUser = this.users.find(({ id }) => id === userId);
    if (!validate(userId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return foundedUser;
  }

  create(createUserDto: CreateUser) {
    return {};
  }

  update(updateUserDto: UpdatePassword, id: string) {
    return {};
  }

  delete(id: string) {
    return {};
  }
}
