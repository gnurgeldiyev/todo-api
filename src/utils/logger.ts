import winston, {format} from 'winston';
import {NODE_ENV} from '../config';

const customOpt = {
  level: 'info',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'blue',
  },
};

winston.addColors(customOpt.colors);

const logger = winston.createLogger({
  level: customOpt.level,
  levels: customOpt.levels,
  format: format.combine(
    format.splat(),
    format.json(),
  ),
  transports: [],
});

logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});

// STDOUT to console
if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.simple(),
  }));
}

export default logger;
