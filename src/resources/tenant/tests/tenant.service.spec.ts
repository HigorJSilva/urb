import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '../entities/tenant.entity';
import {
  createTenant,
  returnedTenant,
  updateTenantDto,
  updatedTenant,
} from './mocks/tenant.mocks';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TenantService', () => {
  let service: TenantService;
  let tenantRepository: Repository<Tenant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            save: jest.fn().mockResolvedValue(returnedTenant),
            findOneBy: jest.fn().mockResolvedValue(returnedTenant),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
    tenantRepository = module.get<Repository<Tenant>>(
      getRepositoryToken(Tenant),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(tenantRepository).toBeDefined();
  });

  describe('create tenant service', () => {
    it('should return the created tenant if succeeds', async () => {
      const response = await service.create(createTenant);
      expect(response).toEqual(returnedTenant);
    });
  });

  describe('list tenant by id service', () => {
    it('should return the tenant given an id', async () => {
      const response = await service.findOne(
        returnedTenant.id,
        createTenant.userId,
      );

      expect(response).toEqual(returnedTenant);
    });

    it('should return a Not Found Exception if tenant not found', async () => {
      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Tenant not found');

      await expect(
        service.findOne('invalidId', createTenant.userId),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('update tenant service', () => {
    it('should return the updated tenant if succeeds', async () => {
      jest.spyOn(tenantRepository, 'save').mockResolvedValueOnce(updatedTenant);

      const response = await service.update(
        returnedTenant.id,
        returnedTenant.userId,
        updateTenantDto,
      );

      expect(response).toHaveProperty('name', updatedTenant.name);
      expect(response).toHaveProperty('email', updatedTenant.email);
    });

    it('should return a Not Found Exception if tenant not found', async () => {
      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Tenant not found');

      await expect(
        service.update(returnedTenant.id, updatedTenant.userId, updatedTenant),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('remove tenant service', () => {
    it('should return undefined if succeeds', async () => {
      const response = await service.remove(
        returnedTenant.id,
        returnedTenant.userId,
      );

      expect(response).toBe(undefined);
    });

    it('should return a Not Found Exception if tenant not found', async () => {
      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Tenant not found');

      await expect(
        service.remove(returnedTenant.id, returnedTenant.userId),
      ).rejects.toEqual(notFoundException);
    });
  });
});
