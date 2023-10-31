"use client";

import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { motion as m } from "framer-motion";

interface AvatarProps {
  isLarge?: boolean;
  hasBorder?: boolean;
  userId: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  isLarge,
  hasBorder,
  userId,
  className,
}) => {
  const router = useRouter();
  const { data, isLoading } = useUser(userId);
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/profile/${userId}`);
    },
    [router, userId]
  );
  return (
    <m.div
      className={twMerge(
        isLarge ? "h-32 w-32" : "h-12 w-12",
        hasBorder && "border-2 border-black",
        "rounded-full relative cursor-pointer",
        className
      )}
      animate={!isLoading && data?.data ? { rotateY: 360 } : {}}
      transition={{ duration: 0.5, damping: 20 }}
    >
      <Image
        alt={`profile/${userId}`}
        src={
          data && data.data && data.data && data.data.image
            ? data.data.image
            : "/images/placeholder.png"
        }
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        onClick={handleClick}
      />
    </m.div>
  );
};

export default Avatar;
