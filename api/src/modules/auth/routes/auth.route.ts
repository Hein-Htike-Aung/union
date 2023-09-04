import express from 'express';
import AuthController from '../controllers/auth.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { credentialSchema } from '../schemas/auth.schema';

const router = express.Router();

router.post(
  '/v1/auth/login',
  [validateRequest(credentialSchema)],
  AuthController.login,
);

export default router;
