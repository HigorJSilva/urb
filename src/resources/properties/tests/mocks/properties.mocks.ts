import { Addresses } from 'src/resources/addresses/entities/address.entity';
import { CreatePropertyDto } from '../../dto/create-property.dto';
import { ReturnPropertyDto } from '../../dto/return-property.dto';
import { Property } from '../../entities/property.entity';
import { UpdatePropertyDto } from '../../dto/update-property.dto';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

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

export const updatedProperty: UpdatePropertyDto = {
  title: 'new property tittle',
  address: {
    addLine: 'new street name, new block new number',
    zipCode: '99999999',
    cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
  },
  userId: 'c851d369-031f-49b2-8460-a5d0c6c2661d',
} as UpdatePropertyDto;

export const updatedReturnedProperty: Property = {
  title: 'new property tittle',
  address: {
    addLine: 'new street name, new block new number',
    zipCode: '99999999',
    cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
    id: 'd41d6807-bcdb-491d-8383-8d8ee7d5dec4',
  } as Addresses,
  userId: 'fb034dcf-80d4-474a-a125-3a3e1e7cddf6',
  addressId: 'd41d6807-bcdb-491d-8383-8d8ee7d5dec4',
  id: 'c851d369-031f-49b2-8460-a5d0c6c2661d',
} as Property;

export const findAllQuery: PaginateQuery = {
  path: 'http://localhost:3131/api/properties',
  filter: { user_id: createProperty.userId },
};

export const findAllQueryResponse: Paginated<Property> = {
  data: [
    {
      id: 'e27cbc43-9f56-46cd-a503-02ab02c8e9a1',
      userId: '15f373c1-7494-4750-9618-a6a5d338e08c',
      addressId: 'b0454f96-d2c3-47b6-bca0-37ee3a387c77',
      title: 'Downtown penthouse',
      address: {
        id: 'b0454f96-d2c3-47b6-bca0-37ee3a387c77',
        addLine: '2nd avenue, East Maple Building, 112',
        zipCode: '88888888',
        cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
        city: null,
      },
    },
    {
      id: 'a41dacef-8a0f-4bc7-9316-ec61192459e7',
      userId: '15f373c1-7494-4750-9618-a6a5d338e08c',
      addressId: '403ebd17-4a0b-4463-a901-fb5e2bc3ea58',
      title: 'property tittle',
      address: {
        id: '403ebd17-4a0b-4463-a901-fb5e2bc3ea58',
        addLine: 'street name, block number',
        zipCode: '99999999',
        cityId: '0002b482-0c11-41a2-873b-409c825ac1cd',
        city: null,
      },
    },
  ],
  meta: {
    itemsPerPage: 20,
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
    sortBy: [['id', 'DESC']],
    filter: {
      user_id: '15f373c1-7494-4750-9618-a6a5d338e08c',
    },
  },
  links: {
    current:
      'http://localhost:3131/api/properties?page=1&limit=20&sortBy=id:DESC&filter.user_id=15f373c1-7494-4750-9618-a6a5d338e08c',
  },
} as unknown as Paginated<Property>;

export const emptyFindAllQueryResponse: Paginated<Property> = {
  data: [],
  meta: {
    itemsPerPage: 20,
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    sortBy: [['id', 'DESC']],
    filter: { user_id: '15f373c1-7494-4750-9618-a6a5d338e08c' },
  },
  links: {
    current:
      'http://localhost:3131/api/properties?page=1&limit=20&sortBy=id:DESC&filter.user_id=15f373c1-7494-4750-9618-a6a5d338e08c',
  },
} as unknown as Paginated<Property>;
