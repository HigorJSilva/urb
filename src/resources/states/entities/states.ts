import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'states' })
export class States {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  uf: string;
}
