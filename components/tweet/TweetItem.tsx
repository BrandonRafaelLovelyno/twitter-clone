"use client";

import PostDocument from "@/hooks/libs/PostDocument";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";
import { motion as m, AnimatePresence } from "framer-motion";
import useLike from "@/hooks/useLike";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface TweetItemProps {
  post: PostDocument;
  noBorder?: boolean;
}

const TweetItem: React.FC<TweetItemProps> = ({ post, noBorder }) => {
  const router = useRouter();
  const { hasLiked, toggleLike, isLikeLoading, postLoading } = useLike(post.id);
  const [likeNum, setLikeNum] = useState<number>(post.likedIds.length);
  const handleLike = async () => {
    await toggleLike();
    if (!hasLiked) {
      setLikeNum(likeNum + 1);
    } else {
      setLikeNum(likeNum - 1);
    }
  };
  const elapsedDate = formatDistanceToNowStrict(new Date(post.createdAt));
  return (
    <div
      className={twMerge(
        "w-full bg-transparent flex flex-row gap-x-4 h-fit rounded-lg",
        noBorder !== null && noBorder === true
          ? "px-3"
          : "p-3 border-stone-800 border-2"
      )}
    >
      <div className="flex flex-col items-center">
        <Avatar userId={post.userId} isLarge={false} hasBorder />
        <div className="flex-1 w-[2px] rounded-full bg-neutral-700" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row  gap-x-3 items-center">
          <p className="text-white font-bold">{post.user.name}</p>
          <p className="text-neutral-500">{"@" + post.user.username}</p>
          <p className="text-neutral-500 font-semibold text-sm max-lg:hidden">
            {elapsedDate}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-neutral-500 font-semibold text-sm lg:hidden">
            {elapsedDate}
          </p>
          <p className="text-neutral-300">{post.body}</p>
        </div>
        <div className="flex flex-row mt-5 gap-x-5 items-center">
          <m.div
            className="flex flex-row gap-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={postLoading ? {} : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p
              className={twMerge(
                isLikeLoading ? "text-gray-500" : "text-white"
              )}
            >
              {likeNum}
            </p>
            <button
              className={twMerge(
                "duration-500 cursor-pointer disabled:text-red-800 disabled:cursor-not-allowed",
                hasLiked ? "text-red-500" : "hover:text-red-500"
              )}
              disabled={isLikeLoading}
              onClick={handleLike}
            >
              {hasLiked ? (
                <m.div
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <AiTwotoneHeart size={20} />
                </m.div>
              ) : (
                <m.div
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <AiOutlineHeart size={20} />
                </m.div>
              )}
            </button>
          </m.div>
          <m.div
            className="flex flex-row gap-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={postLoading ? {} : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p>{post.comments.length}</p>
            <button
              className="hover:text-blue-500 duration-500 cursor-pointer"
              onClick={() => {
                router.push(`/post/${post.id}`);
              }}
            >
              <BsChat size={18} />
            </button>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
