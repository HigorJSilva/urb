import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { Rent } from 'src/resources/rent/entities/rent.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_id' })
  userId: string;
  @Column({ name: 'address_id' })
  addressId: string;
  @Column()
  title: string;

  @OneToOne(() => Addresses, (address) => address.property, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Addresses;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Rent, (rent) => rent.property)
  rent: Rent[];
}
