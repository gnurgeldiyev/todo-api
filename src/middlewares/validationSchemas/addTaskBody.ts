import * as Joi from 'joi';

export const addContactBodySchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(500).required(),
  dueDate: Joi.date().min('now'),
});
