import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import HttpException from '../common/http-exception';
import logger from '../utils/logger';

const { BAD_REQUEST } = StatusCodes;

const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || BAD_REQUEST;

  logger.err(error, true);

  response.status(status).send(error);
};

export default errorHandler;
