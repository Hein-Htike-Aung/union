import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { paginationQuery } from '../../../utils/commonSchema';
import PatientController from '../controllers/patient.controller';
import {
    createPatientSchema,
    patient_idParam,
    updatePatientSchema,
} from '../schemas/patient.schema';

const router = express.Router();

router.post(
  '/v1/patients',
  [validateRequest(createPatientSchema)],
  PatientController.createPatient,
);
router.patch(
  '/v1/patients/:patient_id',
  [validateRequest(updatePatientSchema)],
  PatientController.updatePatient,
);
router.delete(
  '/v1/patients/:patient_id',
  [validateRequest(patient_idParam)],
  PatientController.deletePatient,
);
router.get(
  '/v1/patients/:patient_id',
  [validateRequest(patient_idParam)],
  PatientController.patientById,
);
router.get(
  '/v1/patients',
  [validateRequest(paginationQuery)],
  PatientController.patientList,
);

export default router;
