import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { isUnique } from 'src/shared/decorator/unique';

export class CreateUserDto {
  @ApiProperty({
    description: "User's email",
  })
  @IsString()
  @IsEmail(undefined, {
    message: 'Must be a valid email address',
  })
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;
  @IsString()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: "User's username",
    maximum: 20,
    minimum: 8,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;
}
