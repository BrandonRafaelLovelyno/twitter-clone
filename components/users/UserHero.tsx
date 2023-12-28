import React from "react";
import Image from "next/image";
import Avatar from "../Avatar";
import { motion as m } from "framer-motion";
import UserDocument from "@/hooks/libs/UserDocument";

interface UserHeroProps {
  user: UserDocument;
}

const UserHero: React.FC<UserHeroProps> = ({ user }) => {
  return (
    <div className="w-full h-40 bg-neutral-500 relative">
      {user.coverImage && (
        <Image src={user.coverImage} alt="cover image" objectFit="cover" fill />
      )}
      <m.div
        className="absolute -bottom-12 left-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Avatar isLarge userId={user.id} hasBorder />
      </m.div>
    </div>
  );
};

export default UserHero;
