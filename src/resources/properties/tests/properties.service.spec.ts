import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from '../properties.service';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createProperty,
  returnedProperty,
  userPropertiesMock,
} from './mocks/properties.mocks';

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
            find: jest.fn().mockResolvedValue(userPropertiesMock),
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
    it('should return the created property if succeeds', async () => {
      const response = await service.create(createProperty);
      expect(response).toEqual(returnedProperty);
    });
  });

  describe('list properties by user service', () => {
    it('should return the list of all propertis from a user', async () => {
      const response = await service.findAll(createProperty.userId);

      expect(response).toEqual(userPropertiesMock);
    });

    it('should return the an empty list of propertis if a user has no properties created', async () => {
      jest.spyOn(propertyRepository, 'find').mockResolvedValueOnce([]);
      const response = await service.findAll(createProperty.userId);

      expect(response).toEqual([]);
    });
  });
});
