import { NextFunction, Request, Response } from 'express';
import path from 'path';

const notFoundHandler = (request: Request, response: Response, _next: NextFunction) => {
  if (request.accepts('html')) {
    response.sendFile(path.resolve('public/404.html'));
  } else {
    response.status(404).json(new Error('ERROR_RESOURCE_NOT_FOUND'));
  }
};

export default notFoundHandler;
