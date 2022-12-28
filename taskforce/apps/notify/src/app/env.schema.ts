import * as Joi from 'joi';

export default Joi.object({
  MAIL_PROTOCOL: Joi.string().required(),
  MAIL_HOST: Joi.string().hostname().required(),
  MAIL_PORT: Joi.number().port().required(),
  MAIL_FROM: Joi.string().required(),
  MONGO_DB: Joi.string().required(),
  MONGO_HOST: Joi.string().hostname().required(),
  MONGO_PORT: Joi.number().port().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_AUTH_BASE: Joi.string().required(),
  RABBIT_USER: Joi.string().required(),
  RABBIT_PASSWORD: Joi.string().required(),
  RABBIT_HOST: Joi.string().hostname().required(),
  RABBIT_NOTIFY_SERVICE_QUEUE: Joi.string().required(),
});
