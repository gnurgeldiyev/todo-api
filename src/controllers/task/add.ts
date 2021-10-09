import {Request, Response} from 'express';
import {getDBConnection} from '../../models';

/**
 *  Add a new task
 * @param {Request} req
 * @param {Response} res
 */
export async function addTask(req: Request, res: Response): Promise<Response> {
  const data = req.body;

  const db = getDBConnection();
  const Task = db.model('Task');

  const result = await Task.create(data);

  return res.status(200).json({
    status: 'ok',
    data: result.toJSON(),
  });
}
