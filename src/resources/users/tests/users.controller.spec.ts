import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { createUserMock, userEntityMock } from './mocks/users_mocks';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('create user service', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('should return user Entity in create', async () => {
      const user = await controller.create(createUserMock);

      expect(user).toEqual(userEntityMock);
    });

    it('should throw a bad request exception of email already exists', async () => {
      const badRequestException = new BadRequestException(
        'email already in use',
      );

      jest
        .spyOn(userService, 'create')
        .mockRejectedValueOnce(badRequestException);

      expect(controller.create(createUserMock)).rejects.toThrow(
        badRequestException,
      );
    });
  });
});
