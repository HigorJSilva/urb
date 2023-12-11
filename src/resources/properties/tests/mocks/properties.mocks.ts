import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { CreatePropertyDto } from '../../dto/create-property.dto';
import { ReturnPropertyDto } from '../../dto/return-property.dto';

export const createProperty: CreatePropertyDto = {
  title: 'property tittle',
  address: {
    addLine: 'street name, block number',
    zipCode: '99999999',
    cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
  },
  userId: 'c851d369-031f-49b2-8460-a5d0c6c2661d',
} as CreatePropertyDto;

export const returnedProperty: ReturnPropertyDto = {
  title: 'property tittle',
  address: {
    addLine: 'street name, block number',
    zipCode: '99999999',
    cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
    id: 'd41d6807-bcdb-491d-8383-8d8ee7d5dec4',
  } as Addresses,
  userId: 'fb034dcf-80d4-474a-a125-3a3e1e7cddf6',
  addressId: 'd41d6807-bcdb-491d-8383-8d8ee7d5dec4',
  id: '832a0b8d-a57e-499f-bf41-99ab9a3175a5',
};
