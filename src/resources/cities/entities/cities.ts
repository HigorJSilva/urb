import { ApiProperty } from '@nestjs/swagger';
import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { States } from 'src/resources/states/entities/states';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cities' })
export class Cities {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'State idetifier',
    nullable: false,
  })
  id: string;

  @Column({ name: 'uf_id' })
  @ApiProperty({
    description: 'State shorthand',
    nullable: false,
  })
  ufId: string;

  @Column()
  @ApiProperty({
    description: 'City name',
    nullable: false,
  })
  name: string;

  @Column({ name: 'codigo_ibge' })
  @ApiProperty({
    description: 'National city identifier',
    nullable: false,
  })
  codigoIbge: string;

  @ManyToOne(() => States, (state) => state.cities)
  @JoinColumn({ name: 'uf_id', referencedColumnName: 'id' })
  state: States;

  @OneToMany(() => Addresses, (address) => address.city)
  addresses: Addresses[];
}
