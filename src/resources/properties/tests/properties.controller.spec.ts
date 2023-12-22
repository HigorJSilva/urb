import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from '../properties.controller';
import { PropertiesService } from '../properties.service';
import {
  createProperty,
  returnedProperty,
  updatedProperty,
  updatedReturnedProperty,
  userPropertiesMock,
} from './mocks/properties.mocks';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { Property } from '../entities/property.entity';

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
            findAll: jest.fn().mockResolvedValue(userPropertiesMock),
            findOne: jest.fn().mockResolvedValue(userPropertiesMock[0]),
            update: jest.fn().mockResolvedValue(updatedReturnedProperty),
            remove: jest.fn().mockResolvedValue(undefined),
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

  describe('list properties by user service', () => {
    it('should return the list of all propertis from a user', async () => {
      const response = await controller.findAll(createProperty.userId);

      expect(response).toEqual(userPropertiesMock);
    });

    it('should return the an empty list of propertis if a user has no properties created', async () => {
      jest.spyOn(propertyService, 'findAll').mockResolvedValueOnce([]);
      const response = await controller.findAll(createProperty.userId);

      expect(response).toEqual([]);
    });
  });

  describe('list property by id service', () => {
    it('should return the property given an id', async () => {
      const response = await controller.findOne(
        userPropertiesMock[0].id,
        createProperty.userId,
      );

      expect(response).toEqual(userPropertiesMock[0]);
    });

    it('should return a Not Found Exception if property not found', async () => {
      const notFoundException = new NotFoundException('Property not found');
      jest
        .spyOn(propertyService, 'findOne')
        .mockRejectedValue(notFoundException);

      await expect(
        controller.findOne(userPropertiesMock[0].id, createProperty.userId),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('update property service', () => {
    it('should return the updated property if succeeds', async () => {
      const response = await controller.update(
        userPropertiesMock[0].id,
        updatedProperty,
        updatedProperty.userId,
      );

      jest
        .spyOn(propertyService, 'update')
        .mockResolvedValueOnce(updatedProperty as Property);

      expect(response).toHaveProperty('title', updatedProperty.title);
      expect(response).toHaveProperty(
        'address.addLine',
        updatedProperty.address.addLine,
      );
    });

    it('should return a Not Found Exception if property not found', async () => {
      const notFoundException = new NotFoundException('Property not found');
      jest
        .spyOn(propertyService, 'update')
        .mockRejectedValueOnce(notFoundException);

      await expect(
        controller.update(
          userPropertiesMock[0].id,
          updatedProperty,
          updatedProperty.userId,
        ),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('update property service', () => {
    it('should return undefined if succeeds', async () => {
      const response = await controller.remove(
        userPropertiesMock[0].id,
        updatedProperty.userId,
      );
      expect(response).toBe(undefined);
    });

    it('should return a Not Found Exception if property not found', async () => {
      const notFoundException = new NotFoundException('Property not found');
      jest
        .spyOn(propertyService, 'remove')
        .mockRejectedValueOnce(notFoundException);

      await expect(
        controller.remove(userPropertiesMock[0].id, updatedProperty.userId),
      ).rejects.toEqual(notFoundException);
    });
  });
});
