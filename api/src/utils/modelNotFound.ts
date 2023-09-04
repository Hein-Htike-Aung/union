import { Response } from 'express';
import errorResponse from './errorResponse';

const modelNotFound = (res: Response, model: string) =>
  errorResponse(res, 404, `${model} not found`);

export default modelNotFound;
