import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {
  IEmailProps,
  IEmailProvider,
} from 'src/shared/interfaces/email.provider';

export default class NodeMailer implements IEmailProvider {
  private transporter;
  private configService = new ConfigService();

  constructor() {
    this.transporter = createTransport({
      service: this.configService.get('MAILER_SERVICE'),
      auth: {
        user: this.configService.get('MAILER_EMAIL'),
        pass: this.configService.get('MAILER_PASSWORD'),
      },
    });
  }

  public async send(payload: IEmailProps): Promise<boolean> {
    const info = await this.transporter.sendMail({
      from: '"Urb team <' + this.configService.get('MAILER_EMAIL') + '>',
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });

    console.log('TURBO >> NodeMailer >> info:', info);

    return true;
  }
}
