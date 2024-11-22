import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import { DbService } from 'src/db/db.service';
import { CreateUser } from 'src/user/types/user.types';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService) {}

  async signup({ login, password }: CreateUser) {
    const hashedPassword = await hash(password, 10);
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

  login() {
    return 2;
  }

  refresh() {
    return 2;
  }
}
