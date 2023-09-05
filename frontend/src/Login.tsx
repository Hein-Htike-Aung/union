import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { ErrorMessage } from "./ErrorMessage";
import publicApi from "./api";
import { TOKEN, USER } from "./constants";
import { useUserStore } from "./store/user.store";

const LoginSchema = yup.object().shape({
  username: yup.string().label("Username").required(),
  password: yup.string().label("Password").required(),
  role: yup.string().label("Role").required(),
});

type LoginType = {
  username: string;
  password: string;
  role: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
  });
  const { updateUser } = useUserStore();
  const { username, password } = watch();
  function submitHandler() {
    const data = { username, password };
    publicApi
      .post("/v1/auth/login", {
        ...data,
        email: data.username,
      })
      .then((res) => {
        const data: LoginResponse = res.data?.data;
        localStorage.setItem(TOKEN, data.access_token);
        localStorage.setItem(USER, JSON.stringify(data.user));
        updateUser(data.user);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Username / password");
      });
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="px-4 py-2 bg-white rounded shadow-lg">
        <form
          method="POST"
          className="flex flex-col p-4 gap-y-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="text-2xl ">Log In</h1>
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
            <label>Password</label>
            <input
              type="text"
              className="px-4 py-2 border w-fit"
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors?.password?.message && (
              <ErrorMessage message={errors?.password?.message} />
            )}
          </div>
          <button
            onClick={() => submitHandler()}
            type="submit"
            className="py-2 text-white bg-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
