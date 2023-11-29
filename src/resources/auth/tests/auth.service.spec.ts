import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import Bcrypt from 'src/shared/providers/hash/bcrypt';
import {
  WrongEmailLoginMock,
  WrongPasswordLoginMock,
  userLoginMock,
} from './mocks/auth.mocks';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/resources/users/users.service';
import { userEntityMock } from 'src/resources/users/tests/mocks/users_mocks';
import { IHashProvider } from 'src/shared/interfaces/hash.provider';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let hashProvider: IHashProvider;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        Bcrypt,
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    hashProvider = module.get<IHashProvider>(Bcrypt);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
    expect(hashProvider).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('user login service', () => {
    it('should return the access token if succeeds', async () => {
      const response = await service.login(userLoginMock);
      expect(response).toHaveProperty('accessToken');
    });

    it('should return error if a wrong email is provided', async () => {
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockResolvedValueOnce(undefined);

      expect(service.login(WrongEmailLoginMock)).rejects.toThrowError(
        new UnauthorizedException('User or password does not match'),
      );
    });

    it('should return error if a wrong password is provided', async () => {
      jest.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(false);

      expect(service.login(WrongPasswordLoginMock)).rejects.toThrowError(
        new UnauthorizedException('User or password does not match'),
      );
    });
  });
});
