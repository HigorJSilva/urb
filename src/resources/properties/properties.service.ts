import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class PropertiesService {
  public static paginateConfig: PaginateConfig<Property> = {
    sortableColumns: [
      'id',
      'title',
      'address.(city.name)',
      'address.(city.state)',
    ],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['title'],
    relations: { address: { city: true } },
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      title: [FilterOperator.ILIKE],
      'address.city.name': [FilterOperator.ILIKE],
      'address.city.state': [FilterOperator.ILIKE],
      user_id: [FilterOperator.EQ],
    },
  };

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyRepository.save(createPropertyDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Property>> {
    return paginate(
      query,
      this.propertyRepository,
      PropertiesService.paginateConfig,
    );
  }

  async findOne(id: string, userId) {
    return await this.findPropertyByIdandUserId(id, userId);
  }

  async update(
    id: string,
    userId: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.findPropertyByIdandUserId(id, userId);

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepository.save({ ...property, ...updatePropertyDto });
  }

  async remove(id: string, userId: string) {
    const property = await this.findPropertyByIdandUserId(id, userId);
    await this.propertyRepository.delete({ id: property.id });

    return;
  }

  async findPropertyByUserId(userId: string): Promise<Property[]> {
    const properties = await this.propertyRepository.find({
      where: {
        userId: userId,
      },
      relations: { address: true },
    });

    if (!properties.length) {
      throw new NotFoundException(`User has no properties yet`);
    }

    return properties;
  }

  async findPropertyByIdandUserId(
    id: string,
    userId: string,
  ): Promise<Property> {
    const properties = await this.propertyRepository.findOne({
      where: {
        id,
        userId,
      },
      relations: { address: true },
    });

    if (!properties) {
      throw new NotFoundException('Property not found');
    }

    return properties;
  }
}
