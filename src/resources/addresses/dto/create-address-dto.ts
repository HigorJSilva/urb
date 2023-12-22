import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Address line',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(4)
  addLine: string;

  @ApiProperty({
    description: 'Zip code',
    required: true,
  })
  @Length(8)
  @IsNotEmpty()
  @IsNumberString()
  zipCode: string;

  @ApiProperty({
    description: 'City identifier',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  cityId: string;
}
