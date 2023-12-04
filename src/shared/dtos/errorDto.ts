import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ErrorDto {
  @ApiProperty({
    description: 'Error description',
    required: true,
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Error name',
    required: true,
  })
  @IsString()
  error: string;

  @ApiProperty({
    description: 'Error status code',
    required: true,
  })
  @IsString()
  statusCode: number;
}
