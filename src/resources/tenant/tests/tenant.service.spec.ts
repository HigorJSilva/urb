import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '../entities/tenant.entity';
import { createTenant, returnedTenant } from './mocks/tenant.mocks';
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
});
