import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage } from "../../ErrorMessage";
import { privateApi } from "../../api";

const PatientSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  phone: yup.string().label("Phone").required(),
  age: yup
    .number()
    .label("Age")
    .required("Invalid Age Value")
    .integer("Invalid Age Value"),
  address: yup.string().label("Address").required(),
  township_id: yup.number().label("Township").required(),
  district: yup.number().label("District").required(),
  state: yup.number().label("State").required(),
});
type PatientType = {
  name: string;
  phone: string;
  age: number;
  address: string;
  township_id: number;
  district: number;
  state: number;
};
const PatientCreate = () => {
  const location = useLocation();
  const patientEditObj = location?.state?.patient;

  const params = useParams();
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientType>({
    mode: "onChange",
    resolver: yupResolver(PatientSchema),
  });
  const navigate = useNavigate();
  const { district, state } = watch();
  const { data: townships, isLoading: isTownshipLoading } = useQuery(
    ["townships", district],
    () =>
      privateApi
        .get(`v1/locations/townships/by_district/${district}`)
        .then((res) => res.data.data.townships),
    {
      enabled: !!district,
    }
  );
  const { data: districts, isLoading: isDistrictLoading } = useQuery(
    ["districts", state],
    () =>
      privateApi
        .get(`/v1/locations/districts/by_state/${state}`)
        .then((res) => res.data.data.districts),
    {
      enabled: !!state,
    }
  );

  const { data: states, isLoading: isStateLoading } = useQuery(["states"], () =>
    privateApi.get("/v1/locations/states").then((res) => res.data.data.states)
  );

  async function submitHandler(data: PatientType) {
    try {
      if (params.id) {
        await privateApi.patch(`/v1/patients/${params.id}`, data);
        toast.success("Patient updated successfully.");
        return navigate("/dashboard/patient");
      } else {
        await privateApi.post("/v1/patients", data);
      }
      reset();
      toast.success("Patient created successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    if (patientEditObj) {
      const patient: Patient = patientEditObj;
      setValue("name", patient.name);
      setValue("age", patient.age);
      setValue("address", patient.address);
      setValue("phone", patient.phone);
      setValue("state", patient.township.district.state_id);
      setValue("district", patient.township.district_id);
      setValue("township_id", patient.township.id);
    }
  }, [patientEditObj]);

  const isLoading = isTownshipLoading || isDistrictLoading || isStateLoading;

  if (isLoading && patientEditObj) {
    return <div>Loading........</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col p-4 gap-y-3"
    >
      <h1 className="text-2xl ">Create New Patient</h1>
      <div className="flex flex-col gap-y-2">
        <label>Name</label>
        <input
          type="text"
          className="px-4 py-2 border w-fit"
          placeholder="Enter name"
          {...register("name")}
        />
        {errors?.name?.message && (
          <ErrorMessage message={errors?.name?.message} />
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Age</label>
        <input
          type="number"
          className="px-4 py-2 border w-fit"
          placeholder="Enter Age"
          {...register("age")}
        />
        {errors?.age?.message && (
          <ErrorMessage message={errors?.age?.message} />
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Phone</label>
        <input
          className="px-4 py-2 border w-fit"
          placeholder="Enter Phone"
          {...register("phone")}
        />
        {errors?.phone?.message && (
          <ErrorMessage message={errors?.phone?.message} />
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
              <option key={state.id} value={state.id}>
                {state.state}
              </option>
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
        <label>Address</label>
        <textarea
          className="h-24 px-4 py-2 border w-fit"
          placeholder="Enter Address"
          {...register("address")}
        />
        {errors?.address?.message && (
          <ErrorMessage message={errors?.address?.message} />
        )}
      </div>

      <button className="px-4 py-2 text-white bg-black w-fit">Submit</button>
    </form>
  );
};

export default PatientCreate;
