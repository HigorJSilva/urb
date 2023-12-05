import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressesModule } from './addresses/addresses.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [UsersModule, AuthModule, AddressesModule, PropertiesModule],
})
export class ResourcesModule {}
