import { registerAs } from '@nestjs/config';

export const rtConfig = registerAs('rt', () => ({
  secret: process.env.RT_SECRET,
}));
