import express from 'express';
import UserController from '../controllers/user.controller';
import validateRequest from '../../../middlewares/validateRequest';
import {
  createUserSchema,
  updateUserSchema,
  user_idParam,
} from '../schemas/user.schema';
import { paginationQuery } from '../../../utils/commonSchema';

const router = express.Router();

router.post(
  '/v1/users',
  [validateRequest(createUserSchema)],
  UserController.createUser,
);
router.patch(
  '/v1/users/:user_id',
  [validateRequest(updateUserSchema)],
  UserController.updateUser,
);
router.delete(
  '/v1/users/:user_id',
  [validateRequest(user_idParam)],
  UserController.deleteUser,
);
router.get(
  '/v1/users/:user_id',
  [validateRequest(user_idParam)],
  UserController.userById,
);
router.get(
  '/v1/users',
  [validateRequest(paginationQuery)],
  UserController.userList,
);

export default router;
