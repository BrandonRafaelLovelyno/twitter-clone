"use client";

import Loader from "@/components/Loader";
import Header from "@/components/layout/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useCurrent from "@/hooks/useCurrent";
import { AnimatePresence, motion as m } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export const dynamic = "force-dynamic";

const CurrentProfilePage = () => {
  const { data, isLoading, isValidating } = useCurrent();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (
      !data?.success &&
      status !== "authenticated" &&
      !isLoading &&
      !isValidating
    ) {
      throw new Error("You are not logged in", {
        cause: "There is no user session",
      });
    }
  }, [data, isLoading, isValidating, status]);

  console.log(data);
  console.log("session", session);

  return (
    <m.main
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!isLoading && data?.success && (
        <>
          <Header
            title={session?.user.username ? session.user.username : "..."}
            backButton
          />
          <UserHero user={data.data} />
          <UserBio user={data.data} />
        </>
      )}
    </m.main>
  );
};

export default CurrentProfilePage;
