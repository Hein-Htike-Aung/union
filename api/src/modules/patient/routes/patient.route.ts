import express from 'express';
import PatientController from '../controllers/patient.controller';

const router = express.Router();

router.post('/v1/patients', PatientController.createPatient);
router.patch('/v1/patients/:patient_id', PatientController.updatePatient);
router.delete('/v1/patients/:patient_id', PatientController.deletePatient);
router.get('/v1/patients/:patient_id', PatientController.patientById);
router.get('/v1/patients', PatientController.patientList);

export default router;
