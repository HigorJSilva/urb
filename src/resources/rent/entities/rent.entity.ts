import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rents' })
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'property_id' })
  propertyId: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column()
  dueDate: string;

  @Column()
  value: number;

  @Column()
  active: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
