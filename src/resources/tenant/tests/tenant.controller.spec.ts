import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';
import { createTenant, returnedTenant } from './mocks/tenant.mocks';
import { JwtService } from '@nestjs/jwt';

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
          useValue: { create: jest.fn().mockResolvedValue(returnedTenant) },
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
});
