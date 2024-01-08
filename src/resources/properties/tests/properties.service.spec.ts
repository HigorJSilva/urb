import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from '../properties.service';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createProperty,
  emptyFindAllQueryResponse,
  findAllQuery,
  returnedProperty,
  updatedProperty,
  updatedReturnedProperty,
  userPropertiesMock,
} from './mocks/properties.mocks';
import { NotFoundException } from '@nestjs/common';

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
            findOne: jest.fn().mockResolvedValue(userPropertiesMock[0]),
            update: jest.fn().mockResolvedValue(updatedReturnedProperty),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
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
      const response = await service.findAll(findAllQuery);

      expect(response).toEqual(userPropertiesMock);
    });

    it('should return the an empty list of propertis if a user has no properties created', async () => {
      jest.spyOn(propertyRepository, 'find').mockResolvedValueOnce([]);
      const response = await service.findAll(findAllQuery);

      expect(response).toEqual(emptyFindAllQueryResponse);
    });
  });

  describe('list property by id service', () => {
    it('should return the property given an id', async () => {
      const response = await service.findOne(
        userPropertiesMock[0].id,
        createProperty.userId,
      );

      expect(response).toEqual(userPropertiesMock[0]);
    });

    it('should return a Not Found Exception if property not found', async () => {
      jest.spyOn(propertyRepository, 'findOne').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Property not found');

      await expect(
        service.findOne('invalidId', createProperty.userId),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('update property service', () => {
    it('should return the updated property if succeeds', async () => {
      jest
        .spyOn(propertyRepository, 'save')
        .mockResolvedValueOnce(updatedProperty as Property);

      const response = await service.update(
        userPropertiesMock[0].id,
        updatedProperty.userId,
        updatedProperty,
      );

      expect(response).toHaveProperty('title', updatedProperty.title);
      expect(response).toHaveProperty('address', updatedProperty.address);
    });

    it('should return a Not Found Exception if property not found', async () => {
      jest.spyOn(propertyRepository, 'findOne').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Property not found');

      await expect(
        service.update(
          userPropertiesMock[0].id,
          updatedProperty.userId,
          updatedProperty,
        ),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('remove property service', () => {
    it('should return undefined if succeeds', async () => {
      const response = await service.remove(
        userPropertiesMock[0].id,
        updatedProperty.userId,
      );

      expect(response).toBe(undefined);
    });

    it('should return a Not Found Exception if property not found', async () => {
      jest.spyOn(propertyRepository, 'findOne').mockResolvedValueOnce(null);

      const notFoundException = new NotFoundException('Property not found');

      await expect(
        service.remove(userPropertiesMock[0].id, updatedProperty.userId),
      ).rejects.toEqual(notFoundException);
    });
  });
});
