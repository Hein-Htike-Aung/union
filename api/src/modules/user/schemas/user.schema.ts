import { number, object, string } from 'yup';

const user_id = {
  params: object({
    user_id: string().required(),
  }),
};

export const createUserSchema = object({
  body: object({
    username: string().required(),
    password: string().required(),
    email: string().required(),
    role_id: number().min(1).required(),
    township_id: number().required().min(1),
  }),
});

export const updateUserSchema = object({
  ...user_id,
  body: object({
    username: string(),
    password: string(),
    email: string().required(),
    role_id: number().min(1),
    township_id: number().min(1),
  }),
});

export const user_idParam = object({ ...user_id });
