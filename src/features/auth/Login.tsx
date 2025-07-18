import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/auth/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/User/userSlice";
import { axiosInstance } from "../../api";

import { loginSchema } from "../../models";

type LoginFormType = z.infer<typeof loginSchema>;

export const Login = () => {
  const notifySuccess = () => toast.success("Login Sucessfull");
  const notifyError = () => toast.error("Email or Password is Wrong!!!");

  const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/")
      }
    },[])

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = form;

  const dispatch = useDispatch();
  async function getProfile() {
    const { data } = await axiosInstance.get("/user/profile");
    return data;
  }

  const loginUser = useLogin();
  async function onSubmit(payload: z.infer<typeof loginSchema>) {
    (await loginUser).mutate(payload, {
      onSuccess: async () => {
        navigate("/"), reset(), notifySuccess();

        dispatch(setProfile(await getProfile()));
      },
      onError: () => notifyError(),
    });
  }

  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black p-4 m-4 flex flex-col gap-4 text-black bg-white rounded-md items-center">
      <p className="text-2xl font-bold">Login</p>
      <form
        action="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  m-4 items-center justify-center"
      >
        <input
          className="p-2 border-2 border-black rounded-sm"
          {...register("email")}
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        <input
          className="p-2 border-2 border-black  rounded-md"
          type="password"
          {...register("password")}
          placeholder="Enter Your Password"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="bg-black w-[100px] text-white border-2 border-black hover:border-2 hover:border-black p-2 rounded-md hover:bg-white hover:text-black transition-colors duration-300"
        >
          {isSubmitting || isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="items-center -mt-5 p-0">
        <p className="text-md">
          Don't have Account ?{" "}
          <Link to="/register" className="text-blue-900 text-xl">
            {" "}
            Register
          </Link>
        </p>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
