import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('/api');
  await app.listen(configService.get('PORT'));
}
bootstrap();
