import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  dueDate: Date;

  @Column()
  value: number;

  @Column()
  active = true;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
