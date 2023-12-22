import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Users JWT information',
    type: ReturnLoginDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Error',
    schema: {
      example: {
        message: 'User or password does not match',
        error: 'Unauthorized',
        statuCode: 401,
      },
    },
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginDto);
  }

  @ApiOkResponse({
    description: 'Users JWT information',
    type: ReturnLoginDto,
  })
  @Post('/logout')
  @ApiBearerAuth('JWT-auth')
  async logout(
    @Headers('Authorization') auth: string,
  ): Promise<ReturnLoginDto> {
    return await this.authService.logout(auth);
  }
}
