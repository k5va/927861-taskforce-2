import * as Joi from 'joi';

export const envSchema = Joi.object({
  USERS_SERVICE_URL: Joi.string().required(),
  TASKS_SERVICE_URL: Joi.string().required(),
  NOTIFY_SERVICE_URL: Joi.string().required(),
});
