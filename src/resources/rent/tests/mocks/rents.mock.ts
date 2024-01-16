import { CreateRentDto } from '../../dto/create-rent.dto';
import { ReturnRentDto } from '../../dto/return-rent.dto';

export const createRent: CreateRentDto = {
  userId: '5602e461-4e64-48b2-80fa-d2bafad3602b',
  propertyId: 'd673f3ab-c8e1-44f8-b228-c484bae83fc8',
  tenantId: '331e2c06-4661-4b1a-a670-259c475a033b',
  dueDate: '12',
  value: 350.0,
  active: true,
  startDate: new Date('2022-09-24T07:11:12.629Z'),
  endDate: new Date('2023-09-30T19:20:46.817Z'),
};

export const returnedRent: ReturnRentDto = {
  id: '28567b03-51a5-4e81-a902-fef3718e3d2c',
  userId: '5602e461-4e64-48b2-80fa-d2bafad3602b',
  propertyId: 'd673f3ab-c8e1-44f8-b228-c484bae83fc8',
  tenantId: '331e2c06-4661-4b1a-a670-259c475a033b',
  dueDate: '12',
  value: 350.0,
  active: true,
  startDate: new Date('2022-09-24T07:11:12.629Z'),
  endDate: new Date('2023-09-30T19:20:46.817Z'),
};
