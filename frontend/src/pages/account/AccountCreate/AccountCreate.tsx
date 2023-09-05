import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage } from "../../../ErrorMessage";
import { privateApi } from "../../../api";

const AccountSchema = yup.object().shape({
  username: yup.string().label("Username").required(),
  email: yup.string().email().label("Email").required(),
  township_id: yup.number().label("Township").required(),
  district: yup.number().label("District").required(),
  state: yup.number().label("State").required(),
  password: yup.string().label("Password").required(),
  role_id: yup.number().label("Role").required(),
});

const AccountEditSchema = yup.object().shape({
  username: yup.string().label("Username").required(),
  email: yup.string().email().label("Email").required(),
  township_id: yup.number().label("Township").required(),
  district: yup.number().label("District").required(),
  state: yup.number().label("State").required(),
  password: yup.string().label("Password").optional(),
  role_id: yup.number().label("Role").required(),
});

type AccountType = {
  username: string;
  email: string;
  password?: string;
  township_id: number;
  district: number;
  state: number;
  role_id: number;
};

const AccountCreate = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const userEditObj = location?.state?.user;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AccountType>({
    mode: "onChange",
    resolver: yupResolver(userEditObj ? AccountEditSchema : AccountSchema),
  });

  const { district, state } = watch();
  const { data: townships, isLoading: isTownshipLoading } = useQuery(
    ["townships", district],
    () =>
      privateApi
        .get(`v1/locations/townships/by_district/${district}`)
        .then((res) => res.data.data.townships),
    {
      enabled: district > -1,
    }
  );
  const { data: districts, isLoading: isDistrictLoading } = useQuery(
    ["districts", state],
    () =>
      privateApi
        .get(`/v1/locations/districts/by_state/${state}`)
        .then((res) => res.data.data.districts),
    {
      enabled: state > -1,
    }
  );

  const { data: roles, isLoading: isRoleLoading } = useQuery(["roles"], () =>
    privateApi.get(`/v1/users/roles/list`).then((res) => res.data.data)
  );
  const { data: states, isLoading: isStateLoading } = useQuery(["states"], () =>
    privateApi.get("/v1/locations/states").then((res) => res.data.data.states)
  );
  const isLoading =
    isTownshipLoading || isDistrictLoading || isRoleLoading || isStateLoading;
  async function submitHandler(data: AccountType) {
    try {
      if (params.id) {
        if (!data.password) {
          delete data.password;
        }
        await privateApi.patch(`/v1/users/${params.id}`, data);
        toast.success("User updated successfully.");
        return navigate("/dashboard/account");
      } else {
        await privateApi.post("/v1/users", data);
      }
      reset();
      toast.success("User created successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    if (userEditObj) {
      const user: User = userEditObj;
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("role_id", user.role_id);
      setValue("state", user.township.district.state_id);
      setValue("district", user.township.district_id);
      setValue("township_id", user.township.id);
    }
  }, [userEditObj]);
  if (isLoading && userEditObj) {
    return <div>Loading........</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col p-4 gap-y-3"
    >
      <h1 className="text-2xl ">Create New Account</h1>
      <div className="flex flex-col gap-y-2">
        <label>Username</label>
        <input
          type="text"
          className="px-4 py-2 border w-fit"
          placeholder="Enter username"
          {...register("username")}
        />
        {errors?.username?.message && (
          <ErrorMessage message={errors?.username?.message} />
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Email</label>
        <input
          type="text"
          className="px-4 py-2 border w-fit"
          placeholder="Enter Email"
          {...register("email")}
        />
        {errors?.email?.message && (
          <ErrorMessage message={errors?.email?.message} />
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Password</label>
        <input
          type="password"
          className="px-4 py-2 border w-fit"
          placeholder="Enter Password"
          {...register("password")}
        />
        {errors?.password?.message && (
          <ErrorMessage message={errors?.password?.message} />
        )}
      </div>
      <div className="flex gap-x-4">
        <div className="flex flex-col gap-y-2">
          <label>State</label>
          <select
            {...register("state")}
            required
            className="px-3 py-2 w-fit bg-whtie"
          >
            <option value="">Select</option>
            {(states || []).map((state: State) => (
              <option value={state.id}>{state.state}</option>
            ))}
          </select>
          {errors?.state?.message && (
            <ErrorMessage message={errors?.state?.message} />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <label>District</label>
          <select
            {...register("district")}
            required
            className="px-3 py-2 w-fit bg-whtie"
          >
            <option value="">Select</option>
            {(districts || []).map((district: District) => (
              <option value={district.id}>{district.district}</option>
            ))}
          </select>
          {errors?.state?.message && (
            <ErrorMessage message={errors?.state?.message} />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Township</label>
          <select
            {...register("township_id")}
            required
            className="px-3 py-2 w-fit bg-whtie"
          >
            <option value="">Select</option>
            {(townships || []).map((township: Township) => (
              <option value={township.id}>{township.township}</option>
            ))}
          </select>
          {errors?.township_id?.message && (
            <ErrorMessage message={errors?.township_id?.message} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Role</label>
        <select
          {...register("role_id")}
          required
          className="px-3 py-2 w-fit bg-whtie"
        >
          <option value="">Select</option>
          {(roles || []).map((role: Role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>
        {errors?.role_id?.message && (
          <ErrorMessage message={errors?.role_id?.message} />
        )}
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-black w-fit">
        Submit
      </button>
    </form>
  );
};

export default AccountCreate;
