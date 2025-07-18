import { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { useCommentPost } from "../api/post/postApi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { formatTweetTime } from "../utils/timeFormater";
import type { PostInterface } from "../utils/inrterface/postInterface";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux";

export const Comment : React.FC<{commentData:PostInterface[]}>= ({ commentData }) => {
  const notifysucess = () => toast.success("Comment added");
  const notifyError = () => toast.error("Something went wrong!!!");
  const data = commentData[0].comments;
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const postComment = useCommentPost();
  const qc = useQueryClient()
  const dispatch = useDispatch()
 

   const notifyErr = ()=> toast.error("Login Please")
    const navigate = useNavigate()
useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(logout())
      navigate("/login");
      notifyErr();
    }},[])
  
  function handleSubmit(e: { preventDefault: () => void; }) {
    
    setComment("")
    e.preventDefault()
    const payload = {
      id: commentData[0].id,
      content: comment,
    };

    postComment.mutate(payload, {
      onSuccess: () => {notifysucess(), qc.invalidateQueries({queryKey : ['post']}) },
      onError: () => notifyError(),
    });
  }

  return (
    <div className="cursor-pointer">
      <div className="flex gap-5">
        <FaComments size={30} color="white" onClick={() => setShow(!show)} />

        {show && (
          <section className="bg-white rounded-md dark:bg-gray-900 py-4 w-[500px] antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion ({data.length})
                </h2>
              </div>
              <form className="mb-6" onSubmit={handleSubmit} action="post">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    name="content"
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 border-2 border-white hover:bg-white hover:text-black "
                >
                  Post comment
                </button>
              </form>
              {data.length > 0 && data.map((comment)=>(
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900" key={comment.id}>
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                        {comment.user.firstName} {comment.user.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-02-08" title="February 8th, 2022">
                         {formatTweetTime(comment.createdAt)}
                        </time>
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                  {comment.content}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
