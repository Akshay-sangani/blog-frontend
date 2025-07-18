import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCreatePost, useUpdatePost } from "../api/post/postApi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { PostInterface } from "../utils/inrterface/postInterface";

import { postSchema } from "../models";
import { useDispatch } from "react-redux";
import { logout } from "../redux";
import { useNavigate } from "react-router";

export const Popup: React.FC<{
  postdata: PostInterface | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ postdata, setShow }) => {
  const qc = useQueryClient();
  const notifySuccess = () => toast.success("Posted Sucessfull");
  const dispatch = useDispatch()
  const notifyError = () => toast.error("Something went wrong!");
  const notifyErr = () => toast.error("Login Please");
  const navigate = useNavigate()
useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(logout())
      navigate("/login");
      notifyErr();
    }
  }, []);
  const [create, SetCreate] = useState(true);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postdata ? postdata.title : "",
      content: postdata ? postdata.content : "",
    },
  });

  useEffect(() => {
    if (postdata) {
      SetCreate(false);
    }
  }, []);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(payload: z.infer<typeof postSchema>) {
    if (create) {
      createPost.mutate(payload, {
        onSuccess: () => {
          notifySuccess(),
            setHide(!hide),
            qc.invalidateQueries({ queryKey: ["profile"] });
          qc.invalidateQueries({ queryKey: ["posts"] });

          reset();
        },
        onError: () => {
          notifyError();
        },
      });
    } else {
      payload.id = postdata!.id;
      updatePost.mutate(payload, {
        onSuccess: () => {
          notifySuccess(),
            setHide(!hide),
            qc.invalidateQueries({ queryKey: ["profile"] });
          reset();
        },
        onError: () => {
          notifyError();
        },
      });
    }
  }
  const [hide, setHide] = useState(false);
  const style = hide
    ? " hidden overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full text-black";

  return (
    <div id="default-modal" tabIndex={-1} aria-hidden="true" className={style}>
      <div className="relative p-4 w-full max-w-2xl max-h-full top-[60%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {postdata ? " Edit Post" : "Create Blog Post"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => {
                setHide(!hide), setShow(false);
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4  gird flex flex-col gap-2  m-1 items-center justify-center">
            <form action="post" onSubmit={handleSubmit(onSubmit)} className="">
              <div className="items-center flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="m-2 text-center text-white text-2xl"
                >
                  Title{" "}
                </label>
                <input
                  {...register("title")}
                  className="w-[95%] p-2 m-2 rounded-md"
                ></input>
                {errors.title && (
                  <p className="text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="items-center flex flex-col gap-1">
                <label htmlFor="contet" className="m-1 text-white text-2xl">
                  Contet{" "}
                </label>
                <textarea
                  {...register("content")}
                  cols={42}
                  rows={6}
                  className="rounded-md resize-none mb-5"
                ></textarea>
                {errors.content && (
                  <p className="text-red-400 text-center">
                    {errors.content.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {createPost.isPending
                    ? "Posting..."
                    : postdata
                    ? "Save"
                    : updatePost.isPending
                    ? "Saving"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
