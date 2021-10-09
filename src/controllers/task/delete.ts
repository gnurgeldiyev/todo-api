import {Request, Response} from 'express';
import {getDBConnection} from '../../models';

/**
 *  Delete a task
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteTask(
  req: Request, res: Response
): Promise<Response> {
  const id = req.params.id;

  const db = getDBConnection();
  const Task = db.model('Task');

  await Task.deleteOne({
    _id: id,
  });

  return res.status(200).json({
    status: 'ok',
    data: {},
  });
}
