import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { isUnique } from 'src/shared/decorator/unique';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User`s email',
  })
  @IsEmail(undefined, {
    message: 'Must be a valid email address',
  })
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User`s password',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;
}
