import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Rent]), ScheduleModule.forRoot()],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
