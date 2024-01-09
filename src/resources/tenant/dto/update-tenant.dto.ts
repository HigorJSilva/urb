import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTenantDto } from './create-tenant.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty({
    description: "Tenant's name",
    example: 'John Doe',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Tenant's Document (government issued Id)",
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
