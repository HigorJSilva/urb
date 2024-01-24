import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from '../rent.controller';
import { RentService } from '../rent.service';
import {
  createRent,
  returnedRent,
  updateRent,
  updatedRent,
} from './mocks/rents.mock';
import { JwtService } from '@nestjs/jwt';
import { mockRequest } from 'src/resources/tenant/tests/mocks/tenant.mocks';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
            update: jest.fn().mockResolvedValue(updatedRent),
            remove: jest.fn().mockResolvedValue(undefined),
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

  describe('update rent service', () => {
    it('should return the updated rent if succeeds', async () => {
      const response = await controller.update(
        returnedRent.id,
        mockRequest,
        updateRent,
      );

      expect(response).toHaveProperty('dueDate', updateRent.dueDate);
      expect(response).toHaveProperty('endDate', updateRent.endDate);
    });

    it('should return a Not Found Exception if rent not found', async () => {
      const notFoundException = new NotFoundException('Rent not found');
      jest.spyOn(service, 'update').mockRejectedValueOnce(notFoundException);

      await expect(
        controller.update(returnedRent.id, mockRequest, updateRent),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('remove rent service', () => {
    it('should return undefined if succeeds', async () => {
      const response = await controller.remove(
        returnedRent.id,
        returnedRent.userId,
      );
      expect(response).toBe(undefined);
    });

    it('should return a Not Found Exception if rent not found', async () => {
      const notFoundException = new NotFoundException('Rent not found');
      jest.spyOn(service, 'remove').mockRejectedValueOnce(notFoundException);

      await expect(
        controller.remove(returnedRent.id, returnedRent.userId),
      ).rejects.toEqual(notFoundException);
    });

    it('should return a Bad Request Exception if rent is active', async () => {
      const badRequestException = new BadRequestException('Rent is active');
      jest.spyOn(service, 'remove').mockRejectedValueOnce(badRequestException);

      await expect(
        controller.remove(returnedRent.id, returnedRent.userId),
      ).rejects.toEqual(badRequestException);
    });
  });
});
