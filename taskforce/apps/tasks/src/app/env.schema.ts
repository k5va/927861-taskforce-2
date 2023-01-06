import * as Joi from 'joi';

export const envSchema = Joi.object({
  RABBIT_USER: Joi.string().required(),
  RABBIT_PASSWORD: Joi.string().required(),
  RABBIT_HOST: Joi.string().hostname().required(),
  RABBIT_PORT: Joi.number().port().required(),
  RABBIT_NOTIFY_SERVICE_QUEUE: Joi.string().required(),
  FILES_UPLOAD_FOLDER: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
