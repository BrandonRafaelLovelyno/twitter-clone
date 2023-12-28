"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import userIDPathFetcher from "@/hooks/libs/userIDPathFetcher";
import Header from "@/components/layout/Header";
import { motion as m, AnimatePresence } from "framer-motion";
import useUser from "@/hooks/useUser";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import Loader from "@/components/Loader";
import TweetFeed from "@/components/tweet/TweetFeed";
import usePost from "@/hooks/usePost";

const ProfilePage: React.FC = () => {
  const pathName = usePathname();
  const userId: string = userIDPathFetcher(pathName);
  const { data: userData, isLoading: userLoading } = useUser(userId);
  const { data: postData, isLoading: postLoading } = usePost({ userId });

  useEffect(() => {
    if (!userLoading) {
      return;
    }
    if (userData?.data && userData?.success == false) {
      throw new Error("There is no user with corresponding ID", {
        cause: "Invalid user ID",
      });
    }
  }, [userLoading]);

  return (
    <AnimatePresence>
      <m.main
        initial={{ opacity: 0, y: -20 }}
        exit={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-fit pb-10"
      >
        {userLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!userLoading && userData?.success && (
          <>
            <Header
              title={
                userLoading || !userData || !userData.data
                  ? "..."
                  : userData.data.username
              }
              backButton
            />
            <UserHero user={userData.data} />
            <UserBio user={userData.data} />
          </>
        )}
        {!postLoading && postData?.data && (
          <m.div
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={postLoading || !postData?.data ? {} : { opacity: 1, y: 0 }}
            className="mt-10 px-5"
          >
            <TweetFeed posts={postData.data} />
          </m.div>
        )}
      </m.main>
    </AnimatePresence>
  );
};

export default ProfilePage;
