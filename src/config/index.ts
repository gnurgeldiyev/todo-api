import dotenv from 'dotenv';
import {join} from 'path';

const filePath = join(__dirname, `../../${process.env.NODE_ENV}.env`);

const result = dotenv.config({
  path: filePath,
});
if (result.error) {
  throw result.error;
}

export const NODE_ENV = process.env.NODE_ENV;
export const HOST = process.env.HOST as string;
export const PORT = Number(process.env.PORT);
export const MONGODB_URI = process.env.MONGODB_URI as string;
