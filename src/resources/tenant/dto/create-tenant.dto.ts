import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    description: "Tenant's name",
    required: true,
    example: 'John Doe',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Tenant's Document (government issued Id)",
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @IsNumberString()
  document: string;

  @ApiProperty({
    description: "Tenant's email",
    example: 'email@email.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail(undefined, {
    message: 'Must be a valid email address',
  })
  email: string;

  @ApiProperty({
    description: "Tenant's fone",
    example: '555666777',
  })
  @IsString()
  @IsOptional()
  fone: string;

  userId: string;
}
