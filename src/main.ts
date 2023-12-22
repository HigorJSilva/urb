import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { config } from './shared/config/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(configService.get('PORT'));
}
bootstrap();
