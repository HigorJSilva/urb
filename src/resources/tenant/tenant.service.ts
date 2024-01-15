import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnTenantDto } from './dto/return-tunant.dto';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class TenantService {
  public static paginateConfig: PaginateConfig<Tenant> = {
    sortableColumns: ['id', 'name', 'email', 'fone', 'document'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['name', 'email', 'fone', 'document'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      name: [FilterOperator.ILIKE],
      email: [FilterOperator.ILIKE],
      fone: [FilterOperator.ILIKE],
      document: [FilterOperator.ILIKE],
      user_id: [FilterOperator.EQ],
    },
  };
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<ReturnTenantDto> {
    return await this.tenantRepository.save(createTenantDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Tenant>> {
    return paginate(query, this.tenantRepository, TenantService.paginateConfig);
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

  async remove(id: string, userId: string) {
    const tenant = await this.getTenantByUserandId(id, userId);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    await this.tenantRepository.delete({ id: tenant.id });
    return;
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
