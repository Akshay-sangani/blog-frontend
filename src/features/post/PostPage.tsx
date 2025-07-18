import { Link, useNavigate, useParams } from "react-router";
import { useGetOnePost } from "../../api/post/postApi";
import { useState } from "react";
import { Like } from "../../components/Like";
import { Comment } from "../../components/Comment";
import { toast } from "react-toastify";

import { formatTweetTime } from "../../utils/timeFormater";
import { useDispatch } from "react-redux";
import { logout } from "../../redux";

export const PostPage = () => {
  const notifyError = () => toast.error("Login Please");
  const { id } = useParams();
  const data = useGetOnePost(id as unknown as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (data.isError) {
    dispatch(logout());
    navigate("/login");
    notifyError();
  }
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //     notifysucess();
  //   }
  // }, []);

  const [read, setRead] = useState(false);

  if (data.isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="flex items-center justify-center mr-[100px] ml-[100px] mt-[30px]">
      <article
        key={data.data[0].id}
        className="p-6 w-[1000px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex justify-between items-center mb-4">
          {data.data[0].author && (
            <div className="flex items-center space-x-4">
              <img
                className="w-7 h-7 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Leos avatar"
              />
              <Link to={`/profile/${data.data[0].author.id}`}>
                <span className="font-medium dark:text-white">
                  {data.data[0].author.firstName} {data.data[0].author.lastName}
                </span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  {formatTweetTime(data.data[0].createdAt)}
                </time>
              </p>
            </div>
          )}
        </div>

        {/* <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="text-sm">14 days ago</span>
            </div> */}
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/post/${data.data[0].id}`}>{data.data[0].title}</Link>
        </h2>

        {read ? (
          <p className="mb-5  font-light text-gray-500 dark:text-gray-400">
            {data.data[0].content}
            {data.data[0].content.length > 600 ? (
              <span
                onClick={() => setRead(!read)}
                className="text-white cursor-pointer"
              >
                {!read ? "Read more.." : "Collapse..."}.
              </span>
            ) : (
              <></>
            )}
          </p>
        ) : (
          <p className="mb-5  font-light text-gray-500 dark:text-gray-400">
            {data.data[0].content.substring(0, 600)} &nbsp;&nbsp;
            <span
              onClick={() => setRead(!read)}
              className="text-white cursor-pointer"
            >
              {!read ? "Read more.." : "Collapse..."}.
            </span>
          </p>
        )}

        <div className="flex gap-3">
          <Like likeData={data.data} />
          <Comment commentData={data.data} />
        </div>
      </article>
    </div>
  );
};
