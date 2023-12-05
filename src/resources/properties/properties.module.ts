import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property, AddressesModule])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
