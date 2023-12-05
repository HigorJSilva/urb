import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/address.entity';
import { Cities } from '../cities/entities/cities';
import { States } from '../states/entities/states';

@Module({
  imports: [TypeOrmModule.forFeature([Addresses, Cities, States])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
