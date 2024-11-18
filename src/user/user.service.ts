import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate, v4 } from 'uuid';

import { CreateUser, UpdatePassword, User } from './types/user.types';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async getAll() {
    return (await this.dbService.user.findMany()).map((user) =>
      this.hidePassword(user),
    );
  }

  async getOne(userId: string) {
    const foundedUser = await this.dbService.user.findUnique({
      where: { id: userId },
    });
    if (!validate(userId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return this.hidePassword(foundedUser);
  }

  async create(createUserDto: CreateUser) {
    const newUser = {
      ...createUserDto,
      id: v4(),
      version: 1,
    };
    const user = await this.dbService.user.create({ data: newUser });
    return this.hidePassword(user);
  }

  async update({ oldPassword, newPassword }: UpdatePassword, id: string) {
    const foundedUser = await this.dbService.user.findUnique({
      where: { id },
    });

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
    const updatedUser = await this.dbService.user.update({
      where: { id },
      data: { password: newPassword, version: foundedUser.version + 1 },
    });

    return this.hidePassword(updatedUser);
  }

  async delete(userId: string) {
    const foundedUser = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    if (!validate(userId)) {
      throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
    }
    if (!foundedUser) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    await this.dbService.user.delete({
      where: { id: userId },
    });
  }

  hidePassword(user: User) {
    const { password, ...props } = user;
    return props;
  }
}
