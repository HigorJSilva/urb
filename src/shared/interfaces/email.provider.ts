export interface IEmailProps {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailProvider {
  send(params: IEmailProps): Promise<boolean>;
}
