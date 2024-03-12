import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IEmailProvider } from '../interfaces/email.provider';
import dueRentEmail from 'src/shared/utils/email/installment-template';
import { NotifyInstallmentEvent } from 'src/resources/installment/events/notify-installment.event';
import NodeMailer from '../providers/mailer/nodemailer';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NodeMailer)
    private readonly mailer: IEmailProvider,
  ) {}

  @OnEvent('installment.notify')
  async sendInstallmentNotifications(event: NotifyInstallmentEvent) {
    const tenantEmail = event.tenantContact.email;

    if (!tenantEmail) {
      return;
    }
    const invoiceInfo = event.invoiceInfo;

    const html = Object.keys(invoiceInfo).reduce((result, placeholder) => {
      const regex = new RegExp(`{${placeholder}}`, 'g');
      return result.replace(regex, invoiceInfo[placeholder]);
    }, dueRentEmail);

    this.mailer.send({
      to: tenantEmail,
      subject: 'Rent Invoice ' + invoiceInfo.month,
      text: 'Rent Invoice' + invoiceInfo.month,
      html,
    });
  }
}
