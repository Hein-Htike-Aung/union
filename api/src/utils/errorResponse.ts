import { Response } from 'express';

const errorResponse = (
  res: Response,
  statusCode = 500,
  message: string,
  errors = {},
) => {
  res.status(statusCode).json({
    status: false,
    statusCode,
    message: message || 'Something went wrong',
    errors,
  });
};

export default errorResponse;
