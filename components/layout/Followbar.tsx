"use client";

import useUsers from "@/hooks/useUsers";
import React, { useCallback } from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion as m } from "framer-motion";
import Loader from "../Loader";

const Followbar = () => {
  const { data, isLoading } = useUsers();
  const router = useRouter();
  const handleClick = useCallback(
    (userId: string) => {
      router.push(`/profile/${userId}`);
    },
    [router]
  );
  return (
    <AnimatePresence>
      <m.div
        className="bg-sky-800 h-fit py-3 my-3 mx-2 rounded-lg hidden lg:block px-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-bold text-left mb-5">Who to follow</h2>
        <div className="flex flex-col gap-y-4">
          {isLoading && (
            <m.div
              className="bg-sky-800 h-fit py-3 my-3 mx-2 rounded-lg hidden lg:block px-5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Loader />
            </m.div>
          )}
          {!isLoading &&
            data?.data &&
            data?.data.map((user) => (
              <m.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.random() * 2 }}
                className="flex flex-row gap-x-5 cursor-pointer"
                onClick={() => {
                  handleClick(user.id);
                }}
              >
                <Avatar
                  userId={user.id}
                  hasBorder={true}
                  isLarge={false}
                  key={user.id}
                />
                <div className="flex flex-col">
                  <p className="text-white font-bold text-md">
                    {user.username}
                  </p>
                  <p className="text-neutral-400 text-sm">{"@" + user.name}</p>
                </div>
              </m.div>
            ))}
        </div>
      </m.div>
    </AnimatePresence>
  );
};

export default Followbar;
