import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyRepository.save(createPropertyDto);
  }

  async findAll(userId: string) {
    const userProperties = await this.findPropertyByUserId(userId).catch(
      () => undefined,
    );

    if (!userProperties) {
      return [];
    }

    return userProperties;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
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
}
