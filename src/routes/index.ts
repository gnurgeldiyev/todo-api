import {Router, Request, Response} from 'express';
import Task from '../controllers/task';
import validator, {ValidationSource} from '../middlewares/requestValidator';
import {
  addContactBodySchema,
} from '../middlewares/validationSchemas/addTaskBody';
import {
  catchErrorWrapper,
} from '../middlewares/errorHandler';

// eslint-disable-next-line new-cap
const router = Router();

router.get(
  '/health',
  (req: Request, res: Response) => {
    res.status(200).json({
      isAlive: true,
    });
  }
);

router.post(
  '/tasks',
  validator(addContactBodySchema, ValidationSource.BODY),
  catchErrorWrapper(Task.add),
);

export default router;
