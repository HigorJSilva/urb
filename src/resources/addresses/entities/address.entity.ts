import { Cities } from 'src/resources/cities/entities/cities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'add_line', nullable: true })
  addLine: string;

  @Column({ name: 'zipCode', nullable: false })
  zipCode: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @ManyToOne(() => Cities, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: Cities;
}
