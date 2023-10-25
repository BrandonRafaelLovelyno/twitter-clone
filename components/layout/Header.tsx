"use client";

import React, { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, backButton }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="flex justify-start gap-x-5 px-5 py-3 mb-3">
      {backButton && (
        <button
          onClick={handleClick}
          className="text-neutral-500 hover:text-white duration-200"
        >
          <BiArrowBack size={24} />
        </button>
      )}

      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;
