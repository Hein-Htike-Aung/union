import Patient from '../../../models/patient.model';
import AppError from '../../../utils/appError';

export default class PatientService {
  static findPatientById = async (id: number) => {
    const patient = await Patient.findOne({
      where: {
        id,
      },
    });

    if (!patient) throw new AppError('Patient not found', 404);

    return patient;
  };
}
