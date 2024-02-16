import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'installment' })
export class Installment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rent_id' })
  rentId: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  value: number;
}
