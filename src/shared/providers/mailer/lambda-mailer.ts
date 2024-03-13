import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  IEmailProps,
  IEmailProvider,
} from 'src/shared/interfaces/email.provider';

export default class LamdaMailer implements IEmailProvider {
  private readonly httpService: HttpService = new HttpService();
  private configService = new ConfigService();

  async send(emailOptions: IEmailProps): Promise<boolean> {
    const response = this.httpService.post(
      this.configService.get('MAILER_LAMNBDA_URL'),
      emailOptions,
      {
        headers: {
          'x-api-key': this.configService.get('MAILER_LAMNBDA_API_KEY'),
        },
      },
    );

    response.subscribe((result) => {
      if (result.status !== 200) {
        return false;
      }
    });
    return true;
  }
}
