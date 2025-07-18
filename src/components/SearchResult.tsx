import React, { memo, useState, type RefObject } from "react";
import type { PostInterface } from "../utils/inrterface/postInterface";
import { Link } from "react-router";
import { formatTweetTime } from "../utils/timeFormater";

export const Search: React.FC<{ filterData: PostInterface[] , inputElem : RefObject<HTMLInputElement | null> }> = ({
  filterData , inputElem
}) => {
  if (filterData.length === 0) {
    return <p>No Post Found</p>;
  }
  const [show, setShow] = useState(true);
  return (
    <div>
      <div>
        {show &&
          filterData.map((post) => (
            <div className="bg-white text-black border-2">
              <Link to={`/post/${post.id}`} onClick={() => {setShow(!show) , inputElem.current!.value = ""}}>
                <h2 className="font-semibold"> {post.title.substring(0,20)}</h2>
                <p>{post.content.substring(0, 50)}</p>
                <p>{formatTweetTime(post.createdAt)}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export const SearchResult = memo(Search);
