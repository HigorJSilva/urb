import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import Bcrypt from 'src/shared/providers/hash/bcrypt';
import { createUserMock, userEntityMock } from './mocks/users_mocks';

describe('UserService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        Bcrypt,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create user service', () => {
    it('should return error if user exist', async () => {
      expect(service.create(createUserMock)).rejects.toThrowError();
    });

    it('should return user if user not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const user = await service.create(createUserMock);

      expect(user).toEqual(userEntityMock);
    });

    it('should return user in findUserByEmail', async () => {
      const user = await service.findUserByEmail(userEntityMock.email);

      expect(user).toEqual(userEntityMock);
    });

    it('should return error in findUserByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      expect(
        service.findUserByEmail(userEntityMock.email),
      ).rejects.toThrowError();
    });

    it('should return error in findUserByEmail (error DB)', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        service.findUserByEmail(userEntityMock.email),
      ).rejects.toThrowError();
    });
  });
});
