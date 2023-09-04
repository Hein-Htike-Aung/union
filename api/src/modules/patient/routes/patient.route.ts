import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { paginationQuery } from '../../../utils/commonSchema';
import PatientController from '../controllers/patient.controller';
import {
  createPatientSchema,
  patient_idParam,
  updatePatientSchema,
} from '../schemas/patient.schema';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.post(
  '/v1/patients',
  [validateRequest(createPatientSchema), jwt_auth],
  PatientController.createPatient,
);
router.patch(
  '/v1/patients/:patient_id',
  [validateRequest(updatePatientSchema), jwt_auth],
  PatientController.updatePatient,
);
router.delete(
  '/v1/patients/:patient_id',
  [validateRequest(patient_idParam), jwt_auth],
  PatientController.deletePatient,
);
router.get(
  '/v1/patients/:patient_id',
  [validateRequest(patient_idParam), jwt_auth],
  PatientController.patientById,
);
router.get(
  '/v1/patients',
  [validateRequest(paginationQuery), jwt_auth],
  PatientController.patientList,
);

export default router;
