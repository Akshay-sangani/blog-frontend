import { Link, useNavigate } from "react-router";
import { memo, useEffect, useState } from "react";
import { Popup } from "./Popup";
import { useDeletePost } from "../api/post/postApi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { formatTweetTime } from "../utils/timeFormater";
import type { PostInterface } from "../utils/inrterface/postInterface";
import { logout } from "../redux";
import { useDispatch } from "react-redux";


function PostCardCompo({ posts, isOwner = false } : {posts :  PostInterface[], isOwner : boolean}) {
  const notifyError = () => toast.error("Something Went Wrong!!!");
  const notifyErr = () => toast.error("Login Please");
  const notifySucess = () => toast.success("Post Deleted!!!");
  const [show, setShow] = useState(false);
  const [postdata, setPostData] = useState(undefined);
  const dispatch = useDispatch()
  const qc = useQueryClient();
      const navigate = useNavigate()
useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(logout())
      navigate("/login");
      notifyErr();
    }},[])

  const data = posts;
  const deletePost = useDeletePost();

  function handleSubmit(id: number) {
    const isConfirm = confirm("Are You Sure ??");
    if(isConfirm){
      deletePost.mutate(id, {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["profile"] }),
          notifySucess()
        },
        onError: () => notifyError(),
      });
    }
  }

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-[0.625rem] md:grid-cols-2">
          {show && <Popup postdata={postdata} setShow={setShow} />}

          {data &&
            data.map((post: any) => (
              <article
                key={post.id}
                className="p-6 bg-white  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                {/* <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="text-sm">14 days ago</span>
            </div> */}
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={`/post/${post.id}`}>
                    {post.title.substring(0, 30)}
                  </Link>
                </h2>
                <p className="mb-5  font-light text-gray-500 dark:text-gray-400">
                  {post.content.substring(0, 100)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <time dateTime="2022-02-08" title="February 8th, 2022">
                    {formatTweetTime(post.createdAt)}
                  </time>
                </p>
                <div className="flex justify-between items-center relative bottom-0">
                  {post.author && (
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                      />
                      <Link to={`/profile/${post.author.id}`}>
                        <span className="font-medium dark:text-white">
                          {post.author.firstName} {post.author.lastName}
                        </span>
                      </Link>
                    </div>
                  )}

                  <Link
                    to={`/post/${post.id}`}
                    // to={`/post/${post.id}`}
                    className="inline-flex items-center font-medium text-primary-600 text-white hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      ></path>
                    </svg>
                  </Link>
                </div>
                {isOwner && (
                  <div className="flex mt-6 ">
                    <button
                      onClick={() => {
                        setShow(!show), setPostData(post);
                      }}
                      id={post.id}
                      className="inline-flex items-center  b-0 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit Post
                    </button>
                    <button
                      className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 bg-red-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => handleSubmit(post.id)}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export const PostCard = memo(PostCardCompo);
