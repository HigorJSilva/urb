import { Rent } from 'src/resources/rent/entities/rent.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  email: string;

  @Column()
  fone: string;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Rent, (rent) => rent.tenant)
  rent: Rent[];
}
