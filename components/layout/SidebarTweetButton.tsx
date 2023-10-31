"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaFeatherAlt } from "react-icons/fa";

const SidebarTweetButton = () => {
  const useLogin = useLoginModal();
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    if (!session?.expires) {
      return;
    }
    if (!session.user) {
      return useLogin.onOpen();
    }
    router.push("/");
  };
  return (
    <div
      className="cursor-pointer w-fit md:w-full md:py-2 max-md:p-3 h-fit rounded-full bg-blue-500 items-center justify-center gap-x-3 font-bold text-sm mt-6 flex flex-row duration-300"
      onClick={handleClick}
    >
      <p className="hidden md:block">Tweet</p>
      <FaFeatherAlt size={22} />
    </div>
  );
};

export default SidebarTweetButton;
