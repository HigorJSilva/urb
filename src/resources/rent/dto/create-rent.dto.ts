import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsNumberString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateRentDto {
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
  @Min(1)
  @Max(31)
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

  userId: string;
}
