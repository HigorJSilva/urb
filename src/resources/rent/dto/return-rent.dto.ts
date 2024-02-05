import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsUUID,
} from 'class-validator';
import { ReturnPropertyDto } from 'src/resources/properties/dto/return-property.dto';
import { Property } from 'src/resources/properties/entities/property.entity';
import { ReturnTenantDto } from 'src/resources/tenant/dto/return-tunant.dto';
import { Tenant } from 'src/resources/tenant/entities/tenant.entity';

export class ReturnRentDto {
  @ApiProperty({
    description: 'Id of the rent',
    required: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "Id of the user's rent",
    required: true,
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Id of the property been rent',
    required: true,
  })
  @IsUUID()
  propertyId: string;

  @ApiProperty({
    description: 'Id of the tentant renting',
    required: true,
  })
  @IsUUID()
  tenantId: string;

  @ApiProperty({
    description: "Rent's payment date",
    required: true,
  })
  @IsInt()
  dueDate: string;

  @ApiProperty({
    description: "Rent's value",
    required: true,
  })
  @IsDecimal()
  value: number;

  @ApiProperty({
    description: 'Rent is active',
  })
  @IsBoolean()
  active = true;

  @ApiProperty({
    description: "Rent's start date",
    required: true,
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: "Rent's end date",
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: "Rent's tenant",
    type: ReturnTenantDto,
  })
  tenant?: Tenant;

  @ApiProperty({
    description: "Rent's property",
    type: ReturnPropertyDto,
  })
  property?: Property;
}
