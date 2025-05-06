import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginAuthDto.email,
      },
    });

    if (!user) throw new NotFoundException('email not found!');

    if (!(await argon2.verify(user.password, loginAuthDto.password))) {
      throw new UnauthorizedException('invalid credential');
    }
    const payload = { sub: user.id };

    return {
      user,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
