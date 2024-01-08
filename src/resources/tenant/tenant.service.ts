import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnTenantDto } from './dto/return-tunant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly TenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<ReturnTenantDto> {
    return await this.TenantRepository.save(createTenantDto);
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
