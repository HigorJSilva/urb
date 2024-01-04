import { ApiProperty } from '@nestjs/swagger';
import { Cities } from 'src/resources/cities/entities/cities';
import { Property } from 'src/resources/properties/entities/property.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Address line',
    required: true,
  })
  @Column({ name: 'add_line', nullable: true })
  addLine: string;

  @ApiProperty({
    description: 'Zip code',
    required: true,
  })
  @Column({ name: 'zip_code', nullable: false })
  zipCode: string;

  @ApiProperty({
    description: 'City identifier',
    required: true,
  })
  @Column({ name: 'city_id', nullable: false })
  cityId: string;

  @ManyToOne(() => Cities, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  @ApiProperty({
    description: 'City info',
    required: true,
  })
  city?: Cities;

  @OneToOne(() => Property, (property) => property.address)
  property?: Property;
}
