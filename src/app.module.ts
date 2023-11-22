import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
