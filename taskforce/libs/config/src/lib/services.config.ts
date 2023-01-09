import { registerAs } from '@nestjs/config';

export const servicesConfig = registerAs('services', () => ({
  users: process.env.USERS_SERVICE_URL,
  tasks: process.env.TASKS_SERVICE_URL,
  notify: process.env.NOTIFY_SERVICE_URL,
}));
