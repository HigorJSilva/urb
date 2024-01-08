import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '../entities/tenant.entity';
import { createTenant, returnedTenant } from './mocks/tenant.mocks';
import { Repository } from 'typeorm';

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

  describe('create property service', () => {
    it('should return the created property if succeeds', async () => {
      const response = await service.create(createTenant);
      expect(response).toEqual(returnedTenant);
    });
  });
});
