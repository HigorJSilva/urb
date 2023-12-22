import { Cities } from 'src/resources/cities/entities/cities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'states' })
export class States {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  uf: string;

  @OneToMany(() => Cities, (city) => city.state)
  cities?: Cities[];
}
