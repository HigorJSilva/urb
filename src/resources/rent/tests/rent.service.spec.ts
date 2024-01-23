import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from '../rent.service';
import { Rent } from '../entities/rent.entity';
import {
  createRent,
  returnedRent,
  updateRent,
  updatedRent,
} from './mocks/rents.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RentService', () => {
  let service: RentService;
  let rentRepository: Repository<Rent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        {
          provide: getRepositoryToken(Rent),
          useValue: {
            save: jest.fn().mockResolvedValue(returnedRent),
            findOneBy: jest.fn().mockResolvedValue(returnedRent),
          },
        },
      ],
    }).compile();

    service = module.get<RentService>(RentService);
    rentRepository = module.get<Repository<Rent>>(getRepositoryToken(Rent));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(rentRepository).toBeDefined();
  });

  describe('create rent service', () => {
    it('should return the created rent if succeeds', async () => {
      const response = await service.create(createRent);
      expect(response).toEqual(returnedRent);
    });
  });

  describe('update rent service', () => {
    it('should return the updated rent if succeeds', async () => {
      jest.spyOn(rentRepository, 'save').mockResolvedValueOnce(updatedRent);

      const response = await service.update(
        returnedRent.id,
        returnedRent.userId,
        updateRent,
      );

      expect(response).toHaveProperty('dueDate', updateRent.dueDate);
      expect(response).toHaveProperty('endDate', updateRent.endDate);
    });

    it('should return a Not Found Exception if rent not found', async () => {
      jest.spyOn(rentRepository, 'findOneBy').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Rent not found');

      await expect(
        service.update(returnedRent.id, returnedRent.userId, updateRent),
      ).rejects.toEqual(notFoundException);
    });
  });
});
