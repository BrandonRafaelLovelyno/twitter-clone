"use client";

import usePost from "@/hooks/usePost";
import React, {
  ReactComponentElement,
  ReactElement,
  useMemo,
  useState,
} from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import { Blocks } from "react-loader-spinner";
import PostApiResponse from "@/hooks/libs/postApiResponse";
import TweetItem from "@/components/tweet/TweetItem";
import Avatar from "@/components/Avatar";
import Input from "@/components/input/Input";
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import ApiResponse from "@/hooks/libs/apiResponse";
import { formatDistanceToNowStrict } from "date-fns";
import Login from "@/components/Login";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { data: session } = useSession();
  const [tweet, setTweet] = useState<string>("");
  const {
    data: postData,
    isLoading: postLoading,
    mutate: mutatePost,
  } = usePost({
    postId: params.postId,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post<ApiResponse>("/api/comment", {
        postId: params.postId,
        body: tweet,
      });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      mutatePost();
      toast.success("Comment posted");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
      setTweet("");
    }
  };
  const BottomLoginBar: ReactElement = useMemo(() => {
    if (session?.user) return <></>;
    return (
      <m.div
        initial={{ y: 20, opacity: 0 }}
        exit={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-0 right-0 left-0 bg-blue-900 rounded-2xl h-fit"
      >
        <Login />
      </m.div>
    );
  }, [session]);
  const UserForm: ReactElement = useMemo(() => {
    if (!session) return <></>;
    return (
      <>
        <div className="ml-5 w-0 border-neutral-400 h-12 border-dotted border-r-4" />
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-5 items-center">
            <Avatar userId={session.user.userId} />
            <div className="w-[80%]">
              <Input
                onChange={(e) => setTweet(e.currentTarget.value)}
                placeholder={`What do you think, ${session.user.name} ?`}
                type="text"
                value={tweet}
                className="border-0 focus:border-0 focus:border-b-blue-700 focus:border-b-2"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            className="w-fit px-10 py-2 text-sm ml-auto mr-5"
            label="Reply"
            onClick={handleClick}
            disabled={isLoading}
          />
        </div>
      </>
    );
  }, [tweet, isLoading, handleClick, session]);
  return (
    <AnimatePresence>
      <m.main
        key="main page"
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-3 h-full flex flex-col relative overflow-x-hidden"
      >
        <Header
          title={
            postLoading
              ? "..."
              : `${(postData as PostApiResponse).data.user.username}'s tweet`
          }
          backButton
        />
        {postLoading && (
          <div className="w-full h-screen pb-10 flex justify-center items-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
              />
            </m.div>
          </div>
        )}
        {!postLoading && postData?.data && (
          <m.div
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={postLoading || !postData?.data ? {} : { opacity: 1, y: 0 }}
            className="my-10 flex-1"
          >
            <TweetItem post={(postData as PostApiResponse).data} />
            <div className="pl-5 flex-col">
              {(postData as PostApiResponse).data.comments.map((comment) => (
                <>
                  <div className="ml-5 w-0 border-neutral-400 h-12 border-dotted border-r-4" />
                  <m.div
                    transition={{ delay: 0.5, duration: 0.5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex flex-row gap-x-5">
                      <div className="flex flex-col items-center">
                        <Avatar userId={comment.userId} />
                        <div className="w-[0px] border-2 border-dotted border-neutral-600 bg-neutral-700" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row  gap-x-3 items-center">
                          <p className="text-white font-bold">
                            {comment.user.name}
                          </p>
                          <p className="text-neutral-500">
                            {"@" + comment.user.username}
                          </p>
                          <p className="text-neutral-500 font-semibold text-sm">
                            {formatDistanceToNowStrict(
                              new Date(comment.createdAt)
                            )}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-neutral-300">{comment.body}</p>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </>
              ))}
              {UserForm}
            </div>
          </m.div>
        )}
        {BottomLoginBar}
      </m.main>
    </AnimatePresence>
  );
};

export default PostPage;
