import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { In, Repository } from 'typeorm';
import { Installment } from './entity/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DueRentEvent } from '../rent/events/due-rent.event';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NewInstallmentEvent } from './events/new-installment.event';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(createInstallmentDto: CreateInstallmentDto) {
    return await this.installmentRepository.save(createInstallmentDto);
  }

  async bulkCreate(createInstallmentDtos: CreateInstallmentDto[]) {
    return await this.installmentRepository.save(createInstallmentDtos);
  }

  @OnEvent('rent.due')
  async createInstallment(event: DueRentEvent) {
    const dueRents = event.dueRentList;

    const today = new Date();

    const installments: CreateInstallmentDto[] = dueRents.map((rent) => ({
      rentId: rent.id,
      value: rent.value,
      date: today,
      description:
        new Date().toLocaleString('default', { month: 'long' }) + ' Rent',
    }));

    const createdInstallments = await this.bulkCreate(installments);
    this.eventEmitter.emit(
      'installment.created',
      new NewInstallmentEvent(createdInstallments),
    );
  }

  @OnEvent('installment.created')
  async notifyDueRent(event: NewInstallmentEvent) {
    const installments = event.installments;

    if (!Array.isArray(installments)) {
      return;
    }

    const install = await this.getInstallmentById(
      installments.map((ins) => ins.id),
    );

    const month = new Date().toLocaleString('default', { month: 'long' });

    install.forEach(async (installment) => {
      const eventPayload = {
        tenantName: installment.rent.tenant.name,
        amount: installment.value,
        month,
      };

      //TODO: queue Notification
    });
  }

  async getInstallmentById(ids: string[]) {
    const installment = await this.installmentRepository.find({
      where: { id: In([...ids]) },
      relations: ['rent.tenant', 'rent.property.user'],
    });

    if (!installment) {
      throw new NotFoundException('Installment not found');
    }

    return installment;
  }
}
