import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly rentRepository: Repository<Rent>,
  ) {}
  async create(createRentDto: CreateRentDto): Promise<ReturnRentDto> {
    return await this.rentRepository.save(createRentDto);
  }

  findAll() {
    return `This action returns all rent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rent`;
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
}
