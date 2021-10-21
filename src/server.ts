import 'express-async-errors';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { errorHandler, notFoundHandler } from './middleware';
import BaseRouter from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());

// Static content
const publicDir = path.join(__dirname, '..', 'public');
app.use('/', express.static(publicDir));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add Routers
app.use('/', BaseRouter);

// Print API errors
app.use(errorHandler);

// Show 404 page
app.use(notFoundHandler);

// Export express instance
export default app;
