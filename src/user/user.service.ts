import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate, v4 } from 'uuid';
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
    const newUser = {
      ...createUserDto,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(updateUserDto: UpdatePassword, id: string) {
    return {};
  }

  delete(id: string) {
    return {};
  }
}
