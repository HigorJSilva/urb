import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsUUID,
} from 'class-validator';

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
}
