import { Injectable } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { Repository } from 'typeorm';
import { Installment } from './entity/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}
  async create(createInstallmentDto: CreateInstallmentDto) {
    return await this.installmentRepository.save(createInstallmentDto);
  }
}
