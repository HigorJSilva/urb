import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('URB')
  .setDescription('URB API to manage properties')
  .setVersion('1.0')
  .build();
