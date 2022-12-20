import * as Joi from 'joi';

export default Joi.object({
  MAIL_PROTOCOL: Joi.string().required(),
  MAIL_HOST: Joi.string().hostname().required(),
  MAIL_PORT: Joi.number().port().required(),
  MAIL_FROM: Joi.string().required(),
});
