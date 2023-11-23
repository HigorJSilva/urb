import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import Bcrypt from 'src/shared/providers/hash/bcrypt';

export const createUserMock: CreateUserDto = {
  email: 'ok@email.com',
  username: 'username',
  password: '$2b$08$Fg1OiP6P3h4WEECv7a2Z2OdOLwxnW7FnINRg53J/W9QaJOhQCs4Oi',
};

export const userEntityMock: User = {
  id: 'bab451d3-2833-411d-9e0a-fe7ae1cffbb1',
  email: 'ok@email.com',
  username: 'username',
  password: '$2b$08$Fg1OiP6P3h4WEECv7a2Z2OdOLwxnW7FnINRg53J/W9QaJOhQCs4Oi',
};

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
