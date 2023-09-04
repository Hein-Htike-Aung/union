import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/v1/auth/login', AuthController.login);

export default router;
