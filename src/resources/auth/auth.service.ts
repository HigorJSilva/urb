import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IHashProvider } from 'src/shared/interfaces/hash.provider';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/config/auth/constants';
import Bcrypt from 'src/shared/providers/hash/bcrypt';
import { ReturnLoginDto } from './dto/returnLogin';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject(Bcrypt)
    private readonly hash: IHashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new UnauthorizedException('User or password does not match');
    }

    if (!(await this.hash.compareHash(loginDto.password, user.password))) {
      throw new UnauthorizedException('User or password does not match');
    }

    const payload = {
      sub: { id: user.id, username: user.username, email: user.email },
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, jwtConstants),
    };
  }

  async logout(auth: string): Promise<ReturnLoginDto> {
    const jwt = await this.jwtService.decode(auth.replace('Bearer ', ''));

    return {
      accessToken: await this.jwtService.signAsync(jwt.sub, {
        secret: jwtConstants.secret,
        expiresIn: '1ms',
      }),
    };
  }
}
