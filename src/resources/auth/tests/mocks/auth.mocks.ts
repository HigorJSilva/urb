import { LoginDto } from '../../dto/login.dto';
import { ReturnLoginDto } from '../../dto/returnLogin';

export const userLoginMock: LoginDto = {
  email: 'ok@email.com',
  password: 'password',
};

export const WrongEmailLoginMock: LoginDto = {
  email: 'wrong@email.com',
  password: 'password',
};

export const WrongPasswordLoginMock: LoginDto = {
  email: 'ok@email.com',
  password: 'notpassword',
};

export const returnLoginMock: ReturnLoginDto = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZVVzZXIiOjEsImlhdCI6MTY3NTcyNjIzOCwiZXhwIjoxNjc2MzMxMDM4fQ.c438tTJwSIX8Tq-mj_8grpRmLiwt2V-0bZjPuqE49k8',
};
