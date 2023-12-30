"use client";

import Header from "@/components/layout/Header";
import useNotification from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { Blocks } from "react-loader-spinner";
import Notification from "@/components/Notification";

const NotificationPage = () => {
  const { data: session } = useSession();
  const {
    data: notifData,
    isLoading: notifLoading,
    mutate: mutateNotif,
  } = useNotification();

  useEffect(() => {
    if (!session?.expires) {
      return;
    }
    if (!session.user) {
      throw new Error("You are not logged in", {
        cause: "There is no user session",
      });
    }
  }, [session?.expires, session?.user]);

  useEffect(() => {
    if (!notifData?.success && !notifLoading) {
      throw new Error("Error on fetching notification");
    }
  }, [notifData, notifLoading]);

  return (
    <m.main
      key="main page"
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-3 h-fit flex flex-col"
    >
      {notifLoading && (
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
      {!notifLoading && notifData?.data && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header
            title={
              session?.user
                ? `${session?.user.username}'s notification`
                : "Notification"
            }
            backButton
          />
          {notifData!.data.length <= 0 && (
            <p className="text-neutral-500 text-center font-bold text-xl">
              There is no notification
            </p>
          )}
          {notifData!.data.length > 0 &&
            notifData.data.map((notif) => (
              <m.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Notification body={notif.body} />
              </m.div>
            ))}
        </m.div>
      )}
    </m.main>
  );
};

export default NotificationPage;
