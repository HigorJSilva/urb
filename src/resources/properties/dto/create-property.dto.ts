import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateAddressDto } from 'src/resources/addresses/dto/create-address-dto';
import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { ValidateNested } from 'src/shared/decorator/nested';

export class CreatePropertyDto {
  @ApiProperty({
    description: "Property's title",
    required: true,
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Property's address",
    required: true,
  })
  @ValidateNested(CreateAddressDto)
  @IsNotEmpty()
  address: Addresses;

  userId: string;
}
