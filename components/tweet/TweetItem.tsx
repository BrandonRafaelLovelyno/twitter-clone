"use client"

import PostDocument from "@/libs/PostDocument";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";

interface TweetItemProps {
  post: PostDocument;
}

const TweetItem: React.FC<TweetItemProps> = ({ post }) => {
  const [isLiked,setIsLiked]=useState<boolean>(false)
  const toggleLike=async ()=>{
    setIsLiked(!isLiked)
    // send database request to update the liked
  }
  const elapsedDate = formatDistanceToNowStrict(new Date(post.createdAt));
  return (
    <div className="w-full bg-transparent flex flex-row gap-x-4 p-3 h-fit border-stone-800 border-2 rounded-lg">
      <div className="flex flex-col items-center">
        <Avatar userId={post.userId} isLarge={false} hasBorder />
        <div className="flex-1 w-[2px] rounded-full bg-neutral-700" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row  gap-x-3 items-center">
          <p className="text-white font-bold">{post.user.name}</p>
          <p className="text-neutral-500">{"@" + post.user.username}</p>
          <p className="text-neutral-500 font-semibold text-sm">{elapsedDate}</p>
        </div>
        <div className="mt-2">
          <p className="text-neutral-300">{post.body}</p>
        </div>
        <div className="flex flex-row mt-5 gap-x-5 items-center">
          <button className="hover:text-red-500 duration-500 cursor-pointer">
            <AiOutlineHeart size={20} />
          </button>
          <button className="hover:text-blue-500 duration-500 cursor-pointer">
            <BsChat size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
