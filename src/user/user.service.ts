import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate, v4 } from 'uuid';
import { CreateUser, UpdatePassword, User } from './types/user.types';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll() {
    return this.users.map((user) => this.hidePassword(user));
  }

  getOne(userId: string) {
    const foundedUser = this.findUser(userId);
    if (!validate(userId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return this.hidePassword(foundedUser);
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
    return this.hidePassword(newUser);
  }

  update({ oldPassword, newPassword }: UpdatePassword, id: string) {
    const foundedUser = this.findUser(id);

    if (!validate(id)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    if (foundedUser && oldPassword !== foundedUser.password) {
      throw new HttpException(
        'oldPassword is not equal current password',
        HttpStatus.FORBIDDEN,
      );
    }
    const updatedUser = {
      ...foundedUser,
      version: foundedUser.version + 1,
      password: newPassword,
      updatedAt: Date.now(),
    };
    this.users = [
      ...this.users.filter(({ id }) => id !== foundedUser.id),
      updatedUser,
    ];
    return this.hidePassword(updatedUser);
  }

  delete(userId: string) {
    const foundedUser = this.findUser(userId);

    if (!validate(userId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    this.users = this.users.filter(({ id }) => id !== userId);
  }

  findUser(userId: string) {
    return this.users.find(({ id }) => id === userId);
  }

  hidePassword(user: User) {
    const { password, ...props } = user;
    return props;
  }
}
