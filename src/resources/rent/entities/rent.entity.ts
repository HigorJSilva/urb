import { Installment } from 'src/resources/installment/entity/installment.entity';
import { Property } from 'src/resources/properties/entities/property.entity';
import { Tenant } from 'src/resources/tenant/entities/tenant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Property, (property) => property.rent)
  @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
  property?: Property;

  @ManyToOne(() => Tenant, (tenant) => tenant.rent)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant?: Tenant;

  @OneToMany(() => Installment, (installment) => installment.rent)
  installments?: Installment[];
}
