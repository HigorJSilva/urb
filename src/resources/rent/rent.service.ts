import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ReturnRentDto } from './dto/return-rent.dto';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DueRentEvent } from './events/due-rent.event';

@Injectable()
export class RentService {
  private readonly logger = new Logger(RentService.name);

  public static paginateConfig: PaginateConfig<Rent> = {
    relations: ['property.address.city', 'tenant'],
    sortableColumns: ['id', 'value', 'dueDate', 'active'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: [
      'property.title',
      'tenant.name',
      'tenant.document',
      'active',
    ],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      'property.title': [FilterOperator.ILIKE],
      'tenant.name': [FilterOperator.ILIKE],
      'tenant.document': [FilterOperator.ILIKE],
      active: [FilterOperator.EQ],
    },
  };

  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(createRentDto: CreateRentDto): Promise<ReturnRentDto> {
    return await this.rentRepository.save(createRentDto);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.rentRepository, RentService.paginateConfig);
  }

  async findOne(id: string, userId: string) {
    return await this.getRentByUserandId(id, userId);
  }

  async update(
    id: string,
    userId: string,
    updateRentDto: UpdateRentDto,
  ): Promise<ReturnRentDto> {
    const rent = await this.getRentByUserandId(id, userId);

    if (!rent) {
      throw new NotFoundException('Rent not found');
    }

    return await this.rentRepository.save({ ...rent, ...updateRentDto });
  }

  async remove(id: string, userId: string) {
    const rent = await this.getRentByUserandId(id, userId);

    if (!rent) {
      throw new NotFoundException('Rent not found');
    }

    if (rent.active) {
      throw new BadRequestException('Rent is active');
    }

    await this.rentRepository.delete({ id: rent.id });
    return;
  }

  async getRentByUserandId(id: string, userId: string): Promise<Rent> {
    const rent = await this.rentRepository.findOneBy({
      id,
      userId,
    });

    if (!rent) {
      throw new NotFoundException('Rent not found');
    }

    return rent;
  }

  async dispatchDueRent() {
    const rents = await this.getActiveRents().catch(() => undefined);

    if (!rents) {
      this.logger.warn('No Rent due today\n DAY:' + new Date().toISOString());
      return;
    }

    this.eventEmitter.emit('rent.due', new DueRentEvent(rents));
  }

  private async getActiveRents(): Promise<Rent[]> {
    const currentDate = new Date()
      .toISOString()
      .split('T')[0] as unknown as Date;

    const rents = await this.rentRepository.find({
      where: [
        {
          active: true,
          dueDate: new Date().getDate().toString().padStart(2, '0'),
          startDate: LessThanOrEqual(currentDate),
          endDate: MoreThanOrEqual(currentDate),
        },
        {
          active: true,
          dueDate: new Date().getDate().toString().padStart(2, '0'),
          startDate: LessThanOrEqual(currentDate),
          endDate: null,
        },
      ],
    });

    if (!rents.length) {
      throw new NotFoundException('No active rents found');
    }

    return rents;
  }
}
