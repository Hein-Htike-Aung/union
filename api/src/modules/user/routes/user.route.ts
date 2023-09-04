import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/v1/users', UserController.createUser);
router.patch('/v1/users/:user_id', UserController.updateUser);
router.delete('/v1/users/:user_id', UserController.deleteUser);
router.get('/v1/users/:user_id', UserController.userById);
router.get('/v1/users', UserController.userList);

export default router;
