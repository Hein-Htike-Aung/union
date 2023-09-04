import { Request, Response } from 'express';
import { ResponseError } from '../../types';

const errorHandler = (err: ResponseError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    stack: err?.stack,
    errors: err,
  });
};

export default errorHandler;
