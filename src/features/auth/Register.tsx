import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { useEffect } from "react";

import { useRegister } from "../../api/auth";
import { RegisterSchema } from "../../models";

type LoginFormType = z.infer<typeof RegisterSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Registeration Sucessfull");
  const notifyError = () => toast.error("Something went wrong!");
  const userRegister = useRegister();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    (await userRegister).mutate(data, {
      onSuccess: () => {
        notifySuccess(), reset(), navigate("/login");
      },
      onError: () => {
        notifyError();
      },
    });
  }

    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/login")
      }
    },[])

  return (
    <div className="fixed bg-white rounded-md items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black p-4 m-4 flex flex-col gap-4 text-black">
      <p className="text-2xl font-bold">Register</p>
      <form
        action="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  m-4 items-center justify-center"
      >
        <input
          className="p-2 border-2 border-black"
          {...register("firstName")}
          placeholder="Enter Your Firstname"
        />
        {errors.firstName && (
          <p className="text-red-400">{errors.firstName.message}</p>
        )}
        <input
          className="p-2 border-2 border-black"
          {...register("lastName")}
          placeholder="Enter Your lastName"
        />
        {errors.lastName && (
          <p className="text-red-400">{errors.lastName.message}</p>
        )}
        <input
          className="p-2 border-2 border-black"
          {...register("email")}
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        <input
          className="p-2 border-2 border-black"
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
          className="bg-black text-white p-2 rounded-md  border-2 border-black hover:bg-white hover:border-2 hover:border-black hover:text-black transition-colors duration-300"
        >
          {isSubmitting || isLoading ? "Register..." : "Register"}
        </button>
      </form>
      <div className="-mt-5 p-0">
        <p>
          Already have an Account ?{" "}
          <Link to="/login" className="text-blue-900 text-xl">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
