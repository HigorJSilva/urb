import { ApiProperty } from '@nestjs/swagger';

export class ReturnTenantDto {
  @ApiProperty({
    description: "Tenant's id",
    nullable: false,
    example: 'b71a348a-a10a-4477-92f0-6291d63eef04',
  })
  id: string;

  @ApiProperty({
    description: "Tenant's user id",
    nullable: true,
    example: '0c482f4b-786b-4562-b84f-0df9f699793b',
  })
  userId: string;

  @ApiProperty({
    description: "Tenant's name",
    nullable: false,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: "Tenant's identification",
    nullable: false,
    example: '123456',
  })
  document: string;
  @ApiProperty({
    description: "Tenant's email",
    nullable: true,
    example: 'email@email.com',
  })
  email: string | null;

  @ApiProperty({
    description: "Tenant's fone",
    nullable: true,
    example: '555666777',
  })
  fone: string | null;
}
