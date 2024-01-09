import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';
import {
  createTenant,
  mockRequest,
  returnedTenant,
  updateTenantDto,
  updatedTenant,
} from './mocks/tenant.mocks';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

describe('TenantController', () => {
  let controller: TenantController;
  let tenantService: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        JwtService,
        {
          provide: TenantService,
          useValue: {
            create: jest.fn().mockResolvedValue(returnedTenant),
            findOne: jest.fn().mockResolvedValue(returnedTenant),
            update: jest.fn().mockResolvedValue(updatedTenant),
          },
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
    tenantService = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(tenantService).toBeDefined();
  });

  describe('create tenant controller', () => {
    it('should return the created tenant if succeeds', async () => {
      const response = await controller.create(createTenant, {
        sub: { id: '0c482f4b-786b-4562-b84f-0df9f699793b' },
      });
      expect(response).toEqual(returnedTenant);
    });
  });

  describe('list tenant by id service', () => {
    it('should return the tenant given an id', async () => {
      const response = await controller.findOne(returnedTenant.id, mockRequest);

      expect(response).toEqual(returnedTenant);
    });

    it('should return a Not Found Exception if tenant not found', async () => {
      const notFoundException = new NotFoundException('Tenant not found');
      jest.spyOn(tenantService, 'findOne').mockRejectedValue(notFoundException);

      await expect(
        controller.findOne(returnedTenant.id, mockRequest),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('update tenant service', () => {
    it('should return the updated tenant if succeeds', async () => {
      const response = await controller.update(
        returnedTenant.id,
        mockRequest,
        updateTenantDto,
      );

      jest.spyOn(tenantService, 'update').mockResolvedValueOnce(updatedTenant);

      expect(response).toHaveProperty('name', updateTenantDto.name);
      expect(response).toHaveProperty('email', updateTenantDto.email);
    });

    it('should return a Not Found Exception if tenant not found', async () => {
      const notFoundException = new NotFoundException('Tenant not found');
      jest
        .spyOn(tenantService, 'update')
        .mockRejectedValueOnce(notFoundException);

      await expect(
        controller.update(returnedTenant.id, mockRequest, updateTenantDto),
      ).rejects.toEqual(notFoundException);
    });
  });
});
