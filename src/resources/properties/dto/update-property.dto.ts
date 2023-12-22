import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePropertyDto } from './create-property.dto';
import { IsString, MinLength } from 'class-validator';
import { ValidateNested } from 'src/shared/decorator/nested';
import { CreateAddressDto } from 'src/resources/addresses/dto/create-address-dto';
import { Addresses } from 'src/resources/addresses/entities/address.entity';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @ApiProperty({
    description: "Property's title",
  })
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({
    description: "Property's address",
  })
  @ValidateNested(CreateAddressDto)
  address: Addresses;
}
