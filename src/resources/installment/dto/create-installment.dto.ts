import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsOptional, IsUUID } from 'class-validator';

export class CreateInstallmentDto {
  @ApiProperty({
    description: 'Id of the installment',
    required: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Id of the rent',
    required: true,
  })
  @IsUUID()
  rentId: string;

  @ApiProperty({
    description: 'Payment date',
  })
  @IsOptional()
  date: string;

  @ApiProperty({
    description: 'Installment value',
    required: true,
  })
  @IsDecimal()
  value: number;

  @ApiProperty({
    description: 'Installment description',
    required: true,
  })
  description: string;
}
