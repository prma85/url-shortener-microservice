import dotenv from 'dotenv';
import path from 'path';

const dotenvPath = path.join(__dirname, `env/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

console.log(process.env);
console.log(dotenvPath);

export const isDev = process.env.NODE_ENV !== 'production';

export const MONGO_URI= process.env.MONGO_URI || 'mongodb://urlshortener:urlshortener@mongo:27017/us';

export const PORT = Number(process.env.PORT || 3000);
