import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/address.entity';
import { Cities } from '../cities/entities/cities';
import { States } from '../states/entities/states';

@Module({
  imports: [TypeOrmModule.forFeature([Addresses, Cities, States])],
})
export class AddressesModule {}
