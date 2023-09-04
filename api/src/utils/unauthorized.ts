import { Response } from 'express';
import errorResponse from './errorResponse';

const unauthorized = (res: Response) => errorResponse(res, 401, 'Unauthorized');

export default unauthorized;
