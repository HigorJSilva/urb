import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Addresses } from 'src/resources/addresses/entities/address.entity';

export class CreatePropertyDto {
  @ApiProperty({
    description: "Property's title",
    required: true,
  })
  @IsString()
  @MinLength(4)
  title: string;
  @ApiProperty({
    description: "Property's address",
    required: true,
  })
  address: Addresses;
}
