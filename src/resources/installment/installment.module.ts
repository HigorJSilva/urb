import { Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { Installment } from './entity/installment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Installment])],
  controllers: [InstallmentController],
  providers: [InstallmentService],
})
export class InstallmentModule {}
