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
import {connectDB, closeDBConnection} from './models';
import routes from './routes';
import {
  handleError,
} from './middlewares/errorHandler';

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

app.use('/v1', routes);

app.use(handleError);

if (NODE_ENV !== 'test') {
  const server = app.listen(PORT, HOST, () => {
    logger.info(`Server listening on http://${HOST}:${PORT}`);
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      closeDBConnection();
      logger.info('HTTP server closed');
    });
  });
}


export default app;
