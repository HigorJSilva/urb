import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import NodeMailer from '../providers/mailer/nodemailer';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationsService, NodeMailer],
})
export class NotificationsModule {}
