import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from '../rent.service';
import { Rent } from '../entities/rent.entity';
import { createRent, returnedRent } from './mocks/rents.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
});
