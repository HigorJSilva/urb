import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<ReturnTenantDto> {
    return await this.tenantRepository.save(createTenantDto);
  }

  async findAll() {
    return await this.tenantRepository.find();
  }

  async findOne(id: string, userId: string) {
    return await this.getTenantByUserandId(id, userId);
  }

  async update(
    id: string,
    userId: string,
    updateTenantDto: UpdateTenantDto,
  ): Promise<ReturnTenantDto> {
    const tenant = await this.getTenantByUserandId(id, userId);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return await this.tenantRepository.save({ ...tenant, ...updateTenantDto });
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }

  async getTenantByUserandId(id: string, userId: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOneBy({
      id,
      userId,
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }
}
