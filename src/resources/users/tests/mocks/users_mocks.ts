import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';

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
