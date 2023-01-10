import { registerAs } from '@nestjs/config';

export const servicesConfig = registerAs('services', () => ({
  users: process.env.USERS_SERVICE_URL,
  usersStatic: process.env.USERS_STATIC_URL,
  tasks: process.env.TASKS_SERVICE_URL,
  tasksStatic: process.env.TASKS_STATIC_URL,
  notify: process.env.NOTIFY_SERVICE_URL,
}));
