import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/user/types/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUser): Promise<{ message: string }> {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUser) {
    return this.authService.login(createUserDto);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
