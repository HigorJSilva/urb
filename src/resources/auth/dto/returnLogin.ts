import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReturnLoginDto {
  @ApiProperty({
    description: 'Users JWT information',
    required: true,
  })
  @IsString()
  accessToken: string;
}
