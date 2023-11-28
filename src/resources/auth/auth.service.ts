import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IHashProvider } from 'src/shared/interfaces/hash.provider';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/config/auth/constants';
import Bcrypt from 'src/shared/providers/hash/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject(Bcrypt)
    private readonly hash: IHashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new UnauthorizedException('User or password does not match');
    }

    if (!this.hash.compareHash(loginDto.password, user.password)) {
      throw new UnauthorizedException('User or password does not match');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, jwtConstants),
    };
  }
}
