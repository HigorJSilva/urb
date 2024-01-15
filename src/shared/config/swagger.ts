import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('URB')
  .setDescription('URB API to manage properties')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .setVersion('1.0')
  .build();
