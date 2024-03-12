import { Rent } from 'src/resources/rent/entities/rent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'installment' })
export class Installment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rent_id' })
  rentId: string;

  @Column()
  date: Date;

  @Column({ name: 'payment_date' })
  paymentDate?: Date;

  @Column()
  description: string;

  @Column()
  value: number;

  @ManyToOne(() => Rent, (rent) => rent.installments)
  @JoinColumn({ name: 'rent_id', referencedColumnName: 'id' })
  rent?: Rent;
}
