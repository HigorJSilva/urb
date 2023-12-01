import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { returnLoginMock, userLoginMock } from './mocks/auth.mocks';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(returnLoginMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('user login service', () => {
    it('should return userLogin', async () => {
      const userLogin = await controller.login(userLoginMock);

      expect(userLogin).toEqual(returnLoginMock);
    });
  });

  describe('user logout service', () => {
    it('should return an access token', async () => {
      const userLogin = await controller.login(userLoginMock);

      expect(userLogin).toEqual(returnLoginMock);
    });
  });
});
