import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressesModule } from './addresses/addresses.module';
import { PropertiesModule } from './properties/properties.module';
import { TenantModule } from './tenant/tenant.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AddressesModule,
    PropertiesModule,
    TenantModule,
    RentModule,
  ],
})
export class ResourcesModule {}
