import { Injectable } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { Repository } from 'typeorm';
import { Installment } from './entity/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly intallmentRepository: Repository<Installment>,
  ) {}
  async create(createIntallmentDto: CreateInstallmentDto) {
    return await this.intallmentRepository.save(createIntallmentDto);
  }
}
