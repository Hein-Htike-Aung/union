import { Response } from 'express';
import AppError from './appError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (res: Response, error: any) => {
  console.error({ error });
  if (error instanceof AppError) {
    res.status(500).json({
      status: false,
      statusCode: error.statusCode,
      message: error.message,
    });
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Cannot be deleted',
    });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Already exists',
    });
  } else {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Something went wrong',
      errors: error,
    });
  }
};

export default handleError;
