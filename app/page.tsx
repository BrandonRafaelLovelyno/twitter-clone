"use client";

import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import { motion as m, AnimatePresence } from "framer-motion";
import TweetForm from "@/components/tweet/TweetForm";
import TweetFeed from "@/components/tweet/TweetFeed";
import usePost from "@/hooks/usePost";
import { Blocks } from "react-loader-spinner";
import PostsApiResponse from "@/hooks/libs/postsApiResponse";
import Login from "@/components/Login";

export default function Home() {
  const { status } = useSession();
  const { data, isLoading } = usePost();

  return (
    <AnimatePresence>
      {isLoading && (
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
      {!isLoading && (
        <m.main
          key="main page"
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 h-fit flex flex-col"
        >
          <Header title="Home" />
          {status == "authenticated" ? <TweetForm /> : <Login />}
          <m.div
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoading || !data?.data ? {} : { opacity: 1, y: 0 }}
            className="my-10 flex-1"
          >
            <TweetFeed posts={(data as PostsApiResponse)?.data} />
          </m.div>
        </m.main>
      )}
    </AnimatePresence>
  );
}
