import { registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  protocol: process.env.MAIL_PROTOCOL,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  from: process.env.MAIL_FROM,
}));
