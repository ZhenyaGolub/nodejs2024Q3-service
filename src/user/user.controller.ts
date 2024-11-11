import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUser,
  ReturnedUser,
  UpdatePassword,
  User,
} from './types/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Omit<User, 'password'>[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ReturnedUser {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUser): ReturnedUser {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Body() updateUserDto: UpdatePassword,
    @Param('id') id: string,
  ): ReturnedUser {
    return this.userService.update(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
