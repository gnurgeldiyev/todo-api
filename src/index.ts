import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import {
  NODE_ENV,
  HOST,
  PORT,
} from './config';
import logger from './utils/logger';
import {connectDB} from './models';

connectDB();

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`ACCESS LOG: ${req.url}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({isAlive: true});
});

if (NODE_ENV !== 'test') {
  app.listen(PORT, HOST, () => {
    logger.info(`Server listening on http://${HOST}:${PORT}`);
  });
}

export default app;
