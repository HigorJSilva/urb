import { CreateTenantDto } from '../../dto/create-tenant.dto';
import { ReturnTenantDto } from '../../dto/return-tunant.dto';

export const createTenant: CreateTenantDto = {
  name: 'John Doe',
  document: '123456',
  email: null,
  fone: null,
} as CreateTenantDto;

export const returnedTenant: ReturnTenantDto = {
  id: 'b71a348a-a10a-4477-92f0-6291d63eef04',
  userId: '0c482f4b-786b-4562-b84f-0df9f699793b',
  name: 'John Doe',
  document: '123456',
  email: null,
  fone: null,
};
