import { useNavigate, useParams } from "react-router";
import {
  useDeleteUser,
  useUerProfile,
  useUerProfilebyId,
} from "../api/user/userApis";
import user from "../assets/user.jpg";
import { PostCard } from "./PostCard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/User/userSlice";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Edit } from "../features/profile/Edit";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileCard = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Profile Deleted!!!");
  const notifyError = () => toast.error("Login Please");

  let data = useUerProfile();
  if (id) {
    data = useUerProfilebyId(id);
  }
  if (data.isError) {
     navigate("/login");
     dispatch(logout())
     notifyError();
   }

  const userData = useSelector((state: RootState) => state.user.user);
  const [owner, setIsOwner] = useState(false);
  useEffect(() => {
    if (userData && data.data) {
      console.log("helllo");
      const isOwner = data.data[0].id == userData[0].id;
      console.log(isOwner);
      if (isOwner) {
        setIsOwner(true);
      }
    }
  }, [data]);
  const qc = useQueryClient()
  const delUser = useDeleteUser();
  async function removeUser() {
    const isConfirm = confirm("Are You Sure ??");
    if(isConfirm){
      (delUser).mutate(undefined, {
        onSuccess: () => {
          qc.invalidateQueries({queryKey : ["profile"]})
          dispatch(logout()), navigate("/"), notifySuccess();
        },
        onError: () => notifyError(),
      });
    }
  }

  if (data.isLoading) {
    return  <div className="loader"></div>;
  }

  return (
    <div className="flex ">
      <div className="ml-[50px]  mt-[50px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-fit">
        <div className="flex flex-col items-center p-10 gap-y-2">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user}
            alt="Bonnie image"
          />
          {edit ? (
            <Edit Userdata={data.data[0]} setEdit={setEdit} />
          ) : (
            <>
              {" "}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {data.data[0].firstName} {data.data[0].lastName}
              </h5>
              <span className="text-md text-gray-500 dark:text-gray-400">
                {data.data[0].email}
              </span>
              {data.data[0].profile && (
                <>
                  {" "}
                  <span className="text-md text-gray-500 dark:text-gray-400">
                    {data.data[0].profile.bio}
                  </span>
                  <span className="text-md text-gray-500 dark:text-gray-400">
                    {data.data[0].profile.location}
                  </span>
                  <span className="text-md text-gray-500 dark:text-gray-400">
                    {data.data[0].profile.phone}
                  </span>
                  <span className="text-md text-gray-500 dark:text-gray-400">
                    {data.data[0].profile.userName}{" "}
                  </span>
                </>
              )}
              {owner && (
                <div className="flex mt-4 md:mt-6">
                  <button
                    onClick={() => setEdit(!edit)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit Profile
                  </button>
                  <button
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 bg-red-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={removeUser}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="relative left-10 w-[70%] -top-2">
        <PostCard posts={data.data[0].posts} isOwner={owner} />
      </div>
    </div>
  );
};
