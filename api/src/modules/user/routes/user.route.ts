import express from 'express';
import UserController from '../controllers/user.controller';
import validateRequest from '../../../middlewares/validateRequest';
import {
  createUserSchema,
  updateUserSchema,
  user_idParam,
} from '../schemas/user.schema';
import { paginationQuery } from '../../../utils/commonSchema';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.post(
  '/v1/users',
  [validateRequest(createUserSchema), jwt_auth],
  UserController.createUser,
);
router.patch(
  '/v1/users/:user_id',
  [validateRequest(updateUserSchema), jwt_auth],
  UserController.updateUser,
);
router.delete(
  '/v1/users/:user_id',
  [validateRequest(user_idParam), jwt_auth],
  UserController.deleteUser,
);
router.get(
  '/v1/users/:user_id',
  [validateRequest(user_idParam), jwt_auth],
  UserController.userById,
);
router.get(
  '/v1/users',
  [validateRequest(paginationQuery), jwt_auth],
  UserController.userList,
);

export default router;
