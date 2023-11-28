import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "User's email",
    required: true,
  })
  @IsString()
  @IsEmail(undefined, {
    message: 'Must be a valid email address',
  })
  email: string;

  @ApiProperty({
    description: "User's password",
    maximum: 20,
    minimum: 4,
    required: true,
  })
  @IsString()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
