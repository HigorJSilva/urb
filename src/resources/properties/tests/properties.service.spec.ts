import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from '../properties.service';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createProperty, returnedProperty } from './mocks/properties.mocks';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let propertyRepository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            save: jest.fn().mockResolvedValue(returnedProperty),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    propertyRepository = module.get<Repository<Property>>(
      getRepositoryToken(Property),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(propertyRepository).toBeDefined();
  });

  describe('create property service', () => {
    it('should return the access token if succeeds', async () => {
      const response = await service.create(createProperty);
      expect(response).toEqual(returnedProperty);
    });
  });
});
