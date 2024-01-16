import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Repository } from 'typeorm';
import { ReturnRentDto } from './dto/return-rent.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly tenantRepository: Repository<Rent>,
  ) {}
  async create(createRentDto: CreateRentDto): Promise<ReturnRentDto> {
    return await this.tenantRepository.save(createRentDto);
  }

  findAll() {
    return `This action returns all rent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rent`;
  }

  update(id: number, updateRentDto: UpdateRentDto) {
    return `This action updates a #${id} rent`;
  }

  remove(id: number) {
    return `This action removes a #${id} rent`;
  }
}
