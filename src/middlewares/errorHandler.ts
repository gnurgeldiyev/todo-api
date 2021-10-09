import {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';
import {NODE_ENV} from '../config';

/**
 * Capture unhandled errors
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {void|Response}
 */
export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void|Response {
  if (!err) {
    return next();
  }

  logger.error(err.message, err);

  return res.status(500).json({
    status: 'failed',
    error: {
      code: NODE_ENV === 'production' ?
        'internal-server-error' :
        err.name,
      message: err.message,
    },
  });
}

/**
 * Wrap controllers and capture errors
 * @param {Function} execution
 * @return {Function}
 */
export function catchErrorWrapper(execution: CallableFunction) {
  /**
   * @param {any} args
   * @return {Promise}
   */
  return function catchError(...args: any[]): Promise<any> {
    const fnReturn = execution(...args);
    const next: NextFunction = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
}
