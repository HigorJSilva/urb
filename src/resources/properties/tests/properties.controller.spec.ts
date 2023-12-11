import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from '../properties.controller';
import { PropertiesService } from '../properties.service';
import { returnedProperty } from './mocks/properties.mocks';
import { JwtService } from '@nestjs/jwt';

describe('PropertiesController', () => {
  let controller: PropertiesController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
