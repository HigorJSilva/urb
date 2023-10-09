import { ConfigService } from '@nestjs/config';

export function getDbConfig() {
  return {
    useFactory: (configService: ConfigService) => ({
      type: configService.get('DB_TYPE'),
      dbName: configService.get('DB_DATABASE'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      autoLoadEntities: true,
    }),
    inject: [ConfigService],
  };
}
