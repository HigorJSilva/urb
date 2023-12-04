import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorDto } from 'src/shared/dtos/errorDto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Users JWT information',
    type: ReturnLoginDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Error',
    schema: {
      $ref: getSchemaPath(ErrorDto),
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
  async logout(
    @Headers('Authorization') auth: string,
  ): Promise<ReturnLoginDto> {
    return await this.authService.logout(auth);
  }
}
