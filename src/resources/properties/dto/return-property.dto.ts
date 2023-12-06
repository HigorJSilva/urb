import { ApiProperty } from '@nestjs/swagger';
import { Addresses } from 'src/resources/addresses/entities/address.entity';

export class ReturnPropertyDto {
  id: string;
  @ApiProperty({
    description: "Property's title",
    nullable: false,
  })
  title: string;
  @ApiProperty({
    description: "Property's address",
    nullable: false,
  })
  address: Addresses;
  @ApiProperty({
    description: "Property's user id",
    nullable: false,
  })
  userId: string;
  @ApiProperty({
    description: "Property's address id",
    nullable: false,
  })
  addressId: string;
}
