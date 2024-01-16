import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from '../rent.controller';
import { RentService } from '../rent.service';
import { createRent, returnedRent } from './mocks/rents.mock';
import { JwtService } from '@nestjs/jwt';

describe('RentController', () => {
  let controller: RentController;
  let service: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
      providers: [
        JwtService,
        {
          provide: RentService,
          useValue: {
            create: jest.fn().mockResolvedValue(returnedRent),
          },
        },
      ],
    }).compile();

    controller = module.get<RentController>(RentController);
    service = module.get<RentService>(RentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create rent controller', () => {
    it('should return the created rent if succeeds', async () => {
      const response = await controller.create(createRent, {
        sub: { id: '0c482f4b-786b-4562-b84f-0df9f699793b' },
      });
      expect(response).toEqual(returnedRent);
    });
  });
});
