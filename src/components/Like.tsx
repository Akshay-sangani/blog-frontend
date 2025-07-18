import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useLikePost } from "../api/post/postApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { PostInterface } from "../utils/inrterface/postInterface";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../redux";
import { toast } from "react-toastify";

export const Like: React.FC<{ likeData: PostInterface[] }> = ({ likeData }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch()
  const alreadyLiked = likeData[0].likedBy.find(
    (post) => post.id == user![0].id
  );
  const notifyErr = ()=> toast.error("Login Please")
    const navigate = useNavigate()
useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(logout())
      navigate("/login");
      notifyErr();
    }
  }, []);
  const [liked, setLiked] = useState(!alreadyLiked);
  let likeCount = likeData[0].likedBy.length;
  const [count ,setCount] = useState<number>(likeCount)


  const likedApi = useLikePost();
  const qc = useQueryClient();

  function toggleLike() {
    setLiked(!liked);
    if(liked){
      setCount(count + 1);
    }else{
      setCount(count - 1 );
    }
    likedApi.mutate(likeData[0].id, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["post"] });
      },
    });
  }

  return (
    <div onClick={toggleLike} className="cursor-pointer flex text-white">
      {liked ? (
        <span className="flex gap-2 text-2xl">
          <FaRegHeart size={30} /> {count}{" "}
        </span>
      ) : (
        <span className="flex gap-2 text-2xl">
          <FaHeart size={30} /> {count}
        </span>
      )}
    </div>
  );
};
