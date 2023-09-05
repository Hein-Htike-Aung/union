type LoginResponse = {
  user: User;
  access_token: string;
};

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  role_id: number;
  township_id: number;
  created_at: string;
  updated_at: string;
  role: Role;
  township: Township;
};

type Patient = {
  id: number;
  name: string;
  phone: string;
  age: number;
  address: string;
  township_id: number;
  created_at: string;
  updated_at: string;
  township: Township;
};

type Role = {
  id: number;
  role_name: string;
  created_at: string;
  updated_at: string;
};

type Township = {
  id: number;
  township: string;
  district_id: number;
  created_at: string;
  updated_at: string;
  district: District;
};

type District = {
  id: number;
  state_id: number;
  district: string;
  created_at: string;
  updated_at: string;
  state: State;
};

type State = {
  id: number;
  state: string;
  created_at: string;
  updated_at: string;
};
