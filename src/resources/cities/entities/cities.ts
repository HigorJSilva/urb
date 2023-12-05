import { States } from 'src/resources/states/entities/states';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cities' })
export class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'uf_id' })
  ufId: string;

  @Column()
  name: string;

  @Column({ name: 'codigo_ibge' })
  codigoIbge: string;

  @ManyToOne(() => States, (state) => state.cities)
  @JoinColumn({ name: 'uf_id', referencedColumnName: 'id' })
  state: States;
}
