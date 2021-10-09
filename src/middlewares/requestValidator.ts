/* eslint-disable no-unused-vars */
import * as Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

const validate = (
  validationSchema: Joi.ObjectSchema,
  source: ValidationSource = ValidationSource.BODY
) => (
  req: Request,
  res: Response,
  next: NextFunction
): void|Response => {
  const {error, value} = validationSchema.validate(req[source], {
    stripUnknown: true,
    abortEarly: false,
  });

  if (!error) {
    req[source] = value;
    return next();
  }

  return res.status(400).json({
    error: {
      code: `invalid_request_${source}`,
      details: error.details,
    },
  });
};

export default validate;
