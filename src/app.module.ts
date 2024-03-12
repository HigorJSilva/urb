import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ResourcesModule } from './resources/resources.module';
import { IsUniqueConstraint } from './shared/rules/unique';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './shared/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      entities: [`${__dirname}/resources/**/entities/*.entity{ .ts,.js}`],
      migrations: [`${__dirname}/shared/database/migrations/*{ .ts,.js}`],
      migrationsRun: true,
    }),
    ResourcesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
