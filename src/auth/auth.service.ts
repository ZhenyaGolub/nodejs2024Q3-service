import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

import { DbService } from 'src/db/db.service';
import { CreateUser } from 'src/user/types/user.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, { timestamp: true });
  constructor(
    private readonly dbService: DbService,
    private jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUser) {
    const hashedPassword = await hash(password, Number(process.env.CRYPT_SALT));
    await this.dbService.user.create({
      data: {
        login,
        password: hashedPassword,
        id: v4(),
        version: 1,
      },
    });

    return { message: 'User have been successfully created' };
  }

  async login({ login, password }: CreateUser) {
    const foundedUser = await this.dbService.user.findUnique({
      where: { login },
    });

    if (!foundedUser) {
      throw new HttpException('Authentication error', HttpStatus.FORBIDDEN);
    }

    if (foundedUser && !(await compare(password, foundedUser.password))) {
      throw new HttpException('Authentication error', HttpStatus.FORBIDDEN);
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: foundedUser.id,
        login: foundedUser.login,
      }),
    };
  }

  refresh() {
    return 2;
  }
}
