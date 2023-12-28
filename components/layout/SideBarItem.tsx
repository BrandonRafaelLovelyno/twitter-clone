"use client";

import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

interface SideBarItemProps {
  label: string;
  href?: string;
  Icon: IconType;
  isActive: boolean;
  onClick?: () => void;
  auth?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  href,
  Icon,
  isActive,
  onClick,
  auth,
}) => {
  const session = useSession();
  const router = useRouter();
  const useLogin = useLoginModal();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !session.data?.user) {
      return useLogin.onOpen();
    } else if (href) {
      return router.push(href);
    }
  }, [router, session, auth, href, onClick, useLogin]);
  return (
    <div
      className={twMerge(
        "flex w-full gap-x-5 items-center justify-center md:justify-start duration-300 cursor-pointer",
        isActive && "text-blue-500"
      )}
      onClick={handleClick}
    >
      <Icon size={24} />
      <div
        className={twMerge(
          "hidden duration-200 md:block",
          !isActive && "hover:text-neutral-400 duration-200"
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default SideBarItem;
