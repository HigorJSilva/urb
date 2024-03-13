import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import LamdaMailer from '../providers/mailer/lambda-mailer';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationsService, LamdaMailer],
})
export class NotificationsModule {}
