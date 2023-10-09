import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getDbConfig } from './shared/database/connection';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(getDbConfig() as TypeOrmModuleAsyncOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
