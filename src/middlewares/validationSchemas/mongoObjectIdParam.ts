import * as Joi from 'joi';
import {isValidObjectId, Types} from 'mongoose';

export const mongoObjectIdParam = Joi.object({
  id: Joi.custom((value, helper) => {
    if (isValidObjectId(value)) {
      return new Types.ObjectId(value);
    }

    return helper.error('any.invalid');
  }),
});
