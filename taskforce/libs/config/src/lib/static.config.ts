import { registerAs } from '@nestjs/config';

export const staticConfig = registerAs('static', () => ({
  upload: process.env.FILES_UPLOAD_FOLDER,
}));
