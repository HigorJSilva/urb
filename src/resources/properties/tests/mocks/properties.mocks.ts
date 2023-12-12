import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { CreatePropertyDto } from '../../dto/create-property.dto';
import { ReturnPropertyDto } from '../../dto/return-property.dto';
import { Property } from '../../entities/property.entity';

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
  id: 'c851d369-031f-49b2-8460-a5d0c6c2661d',
};

export const userPropertiesMock: Property[] = [
  {
    id: 'fe423aee-1b3f-41dc-b289-6447ee5e04a6',
    userId: 'fb034dcf-80d4-474a-a125-3a3e1e7cddf6',
    addressId: '7970e5a0-2060-4bfe-a151-e50ee0815335',
    title: 'My first house',
    address: {
      id: '7970e5a0-2060-4bfe-a151-e50ee0815335',
      addLine: '1st street, 453',
      zipCode: '99999999',
      cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
    },
  },
  {
    id: '61572915-bbe4-4f0e-910b-5af886d9d939',
    userId: 'fb034dcf-80d4-474a-a125-3a3e1e7cddf6',
    addressId: 'bdbbc188-caad-4ddd-9481-cdb7de931c90',
    title: 'Downtown penthouse',
    address: {
      id: 'bdbbc188-caad-4ddd-9481-cdb7de931c90',
      addLine: '2nd avenue, East Maple Building, 112',
      zipCode: '88888888',
      cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
    },
  },
  {
    id: '5efbf57d-f3ac-483a-8003-f685ec2f0f6a',
    userId: 'fb034dcf-80d4-474a-a125-3a3e1e7cddf6',
    addressId: 'dafffe66-abfe-4e0c-aa48-ecb860576d5b',
    title: 'Luma hotel Suite',
    address: {
      id: 'dafffe66-abfe-4e0c-aa48-ecb860576d5b',
      addLine: '120 W 41st, 212',
      zipCode: '10036',
      cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
    },
  },
] as Property[];
