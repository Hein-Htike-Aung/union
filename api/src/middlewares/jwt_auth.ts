import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from '../../types';
import UserService from '../modules/v1/user/services/user.service';
import errorResponse from '../utils/errorResponse';

const jwt_auth = (
  req: TokenBasedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return errorResponse(res, 401, 'Unauthorized');

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: TokenVerifyError, targetObj: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 401, err.message);

      const user = await UserService.findUserById(targetObj.id);

      req.user = user;

      next();
    },
  );
};

export default jwt_auth;
