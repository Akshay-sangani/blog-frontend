import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUerUpdateProfile } from "../../api/user/userApis";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../utils/inrterface/userInterface";
import { ediSchema } from "../../models";
export const Edit : React.FC<{Userdata : User,setEdit :  React.Dispatch<React.SetStateAction<boolean>>}>= ({ Userdata  ,setEdit}) => {
  const notifySuccess = () => toast.success("Profile Updateded...");
  const notifyError = () => toast.error("Something went wrong!");

  const data = Userdata;

  type editForm = z.infer<typeof ediSchema>;

  const form = useForm<editForm>({
    resolver: zodResolver(ediSchema),
    defaultValues: {
      firstName: data ? data.firstName : "",
      lastName: data ? data.lastName : "",
      password: "",
      bio: data.profile ? data.profile.bio : "",
      location: data.profile ? data.profile.location : "",
      phone: data.profile ? String(data.profile.phone) : "",
      userName: data.profile ? data.profile.userName : "",
    },
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const updateProfile = useUerUpdateProfile();
  const qc = useQueryClient()
  function editProfile(payload: editForm) {
    console.log(payload);
    updateProfile.mutate(payload, {
      onSuccess: () => {
        qc.invalidateQueries({queryKey : ["profile"]})
        notifySuccess();
        setEdit(false),
        reset()
      },
      onError: () => {
        notifyError(), navigate("/profile");
      },
    });
  }

  return (
    <>
      <form
        action=""
        className="text-white"
        onSubmit={handleSubmit(editProfile)}
      >
        <label htmlFor="">First Name :</label>
        <input
          {...register("firstName")}
          className="border-2 border-black p-2 m-1 text-black"
        />
        {errors.firstName && (
          <p className="text-red-400">{errors.firstName.message}</p>
        )}
        <br />
        <label htmlFor="">Last Name :</label>

        <input
          {...register("lastName")}
          className="border-2 border-black p-2 m-1 text-black"
        />
        {errors.lastName && (
          <p className="text-red-400">{errors.lastName.message}</p>
        )}
        <br />
        <label htmlFor="">Password :</label>

        <input
          {...register("password")}
          className="border-2 border-black p-2 m-1 text-black"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
       
          <>
            {" "}
            <br />
            <label htmlFor="">User Name :</label>
            <input
              {...register("userName")}
              className="border-2 border-black p-2 m-1 text-black"
            />
            {errors.userName && (
              <p className="text-red-400">{errors.userName.message}</p>
            )}
            <br />
            <label htmlFor="">Bio :</label>
            <br />
            <input
              {...register("bio")}
              className="border-2 border-black p-2 m-1 text-black"
            />
            {errors.bio && <p className="text-red-400">{errors.bio.message}</p>}
               <br />
            <label htmlFor="">Location :</label>
            <input
              {...register("location")}
              className="border-2 border-black p-2 m-1 text-black"
            />
            {errors.location && (
              <p className="text-red-400">{errors.location.message}</p>
            )}
               <br />
            <label htmlFor="">Phone No :</label>
            <input
              {...register("phone")}
              className="border-2 border-black p-2 m-1 text-black"
            />
               <br />
            {errors.phone && (
              <p className="text-red-400">{errors.phone.message}</p>
            )}
          </>
        
        <div className="flex justify-center items-center mt-5">
          <button
            type="submit"
            className="inline-flex items-center  px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
export { ediSchema };

