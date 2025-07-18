import { useGetAllPost } from "../../api/post/postApi";
import { PostCard } from "../../components/PostCard";

export const Dashboard = () => {
  const {data , isLoading} = useGetAllPost();

  if (isLoading) {
    return <div className="loader"></div>;
  }
  const posts = data.map((post: any) => {
    return post.post;
  });

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-sm text-center  mt-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold">
            Our Blog
          </h2>
          <p className="font-light  sm:text-xl ">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
      </div>
      <PostCard posts={posts} isOwner={false} />
    </>
  );
};
