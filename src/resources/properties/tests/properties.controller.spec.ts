import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from '../properties.controller';
import { PropertiesService } from '../properties.service';
import { createProperty, returnedProperty } from './mocks/properties.mocks';
import { JwtService } from '@nestjs/jwt';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let propertyService: PropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        JwtService,
        {
          provide: PropertiesService,
          useValue: {
            create: jest.fn().mockResolvedValue(returnedProperty),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    propertyService = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(propertyService).toBeDefined();
  });

  describe('create property controller', () => {
    it('should return the created property if succeeds', async () => {
      const response = await controller.create(createProperty, {
        sub: { id: 'c851d369-031f-49b2-8460-a5d0c6c2661d' },
      });
      expect(response).toEqual(returnedProperty);
    });
  });
});
