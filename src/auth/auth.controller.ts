import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/user/types/user.types';
import { Public } from 'src/custom';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUser): Promise<{ message: string }> {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() createUserDto: CreateUser) {
    return this.authService.login(createUserDto);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
