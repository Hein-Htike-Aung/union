import { number, object, string } from 'yup';

const patient_id = {
  params: object({
    patient_id: string().required(),
  }),
};

export const createPatientSchema = object({
  body: object({
    name: string().required(),
    phone: string().required(),
    age: number().required().min(1),
    address: string().required(),
    township_id: number().min(1).required(),
  }),
});

export const updatePatientSchema = object({
  ...patient_id,
  body: object({
    name: string(),
    phone: string(),
    age: number().min(1),
    address: string(),
    township_id: number().min(1),
  }),
});

export const patient_idParam = object({ ...patient_id });
