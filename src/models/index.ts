import mongoose, {Connection} from 'mongoose';
import logger from '../utils/logger';
import {MONGODB_URI} from '../config';

let dbConnection: Connection;
/**
 * Connect to the DB
 * @return {Connection}
 */
export function connectDB(): Connection {
  const options = {
    retryWrites: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useUnifiedTopology: true,
  };

  // connect to db
  dbConnection = mongoose.createConnection(MONGODB_URI, options);
  dbConnection.on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
  dbConnection.on('connected', () => {
    logger.info({
      message: 'DB connection is successful',
    });
  });

  return dbConnection;
}

/**
 * Returns DB connection
 * @return {Connection}
 */
export function getDBConnection(): Connection {
  if (dbConnection && dbConnection.readyState) {
    return dbConnection;
  }

  const connection = connectDB();
  return connection;
}
