import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

export function getServeStaticOptions(
  configService: ConfigService
): ServeStaticModuleOptions[] {
  const uploadFolder = configService.get<string>('static.upload');

  return [
    {
      rootPath: join(__dirname, uploadFolder),
      serveRoot: '/static',
    },
  ];
}
