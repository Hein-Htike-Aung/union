import { Request, Response } from 'express';
import errorResponse from '../utils/errorResponse';

const urlNotFound = (req: Request, res: Response) =>
  errorResponse(res, 404, `url not found - ${req.originalUrl}`);

export default urlNotFound;
