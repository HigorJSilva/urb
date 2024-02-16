import { Injectable } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { Repository } from 'typeorm';
import { Installment } from './entity/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DueRentEvent } from '../rent/events/due-rent.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}
  async create(createInstallmentDto: CreateInstallmentDto) {
    return await this.installmentRepository.save(createInstallmentDto);
  }

  async bulkCreate(createInstallmentDtos: CreateInstallmentDto[]) {
    return await this.installmentRepository.save(createInstallmentDtos);
  }

  @OnEvent('rent.due')
  createInstallment(event: DueRentEvent) {
    const dueRents = event.dueRentList;

    const today = new Date();

    const installments: CreateInstallmentDto[] = dueRents.map((rent) => ({
      rentId: rent.id,
      value: rent.value,
      date: today,
      description:
        new Date().toLocaleString('default', { month: 'long' }) + ' Rent',
    }));

    this.bulkCreate(installments);
  }
}
