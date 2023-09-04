import { object, string } from 'yup';

const state_id = {
  params: object({
    state_id: string().required(),
  }),
};

const district_id = {
  params: object({
    district_id: string().required(),
  }),
};

export const state_idParam = object({ ...state_id });
export const district_idParam = object({ ...district_id });
