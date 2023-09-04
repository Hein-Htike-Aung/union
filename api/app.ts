import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import morgan from 'morgan';
import process from 'node:process';
import 'reflect-metadata';
import errorHandler from './src/middlewares/errorHandler';
import urlNotFound from './src/middlewares/urlNotFound';
import { modelList } from './src/utils/modelList';
import AuthRouter from './src/modules/auth/routes/auth.route';
import LocationRouter from './src/modules/location/routes/location.route';
import PatientRouter from './src/modules/patient/routes/patient.route';
import UserRouter from './src/modules/user/routes/user.route';

const app = express();

app.use(
  cors({
    origin: [
      '*',
      process.env.WHITE_LIST1!,
      process.env.WHITE_LIST2!,
      process.env.WHITE_LIST3!,
    ],
  }),
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// model list
modelList;

app.use('/api', AuthRouter);
app.use('/api', LocationRouter);
app.use('/api', PatientRouter);
app.use('/api', UserRouter);

app.use(urlNotFound);
app.use(errorHandler);

export default app;
