import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CookieInterceptor } from './interceptor/cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CookieInterceptor)
  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const result = await this.authService.login(loginAuthDto);
    return result;
  }
}
