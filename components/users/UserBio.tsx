"use client";

import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Button from "../Button";
import UserDocument from "@/hooks/libs/UserDocument";
import { format } from "date-fns";
import useEditModal from "@/hooks/useEditModal";
import { useSession } from "next-auth/react";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  user: UserDocument;
}

const UserBio: React.FC<UserBioProps> = ({ user }) => {
  const { data: session } = useSession();
  const useEdit = useEditModal();
  const { isFollowing, toggleFollow, isLoading } = useFollow(user.id);
  const toggleEdit = () => {
    useEdit.onOpen();
  };
  const isCurrentUser = session?.user.userId === user.id;
  const createdAt = format(new Date(user.createdAt), "MMMM yyyy");
  const isCurrentData = isCurrentUser && session?.user;
  return (
    <div className="flex flex-col">
      <div className="flex justify-end p-2">
        {isCurrentUser && (
          <Button
            label="Edit"
            onClick={toggleEdit}
            disabled={isLoading}
            secondary
            className="px-8 py-2"
          />
        )}
        {!isCurrentUser && !isFollowing && (
          <Button
            label="Follow"
            onClick={toggleFollow}
            disabled={isLoading}
            className="px-5 py-2"
          />
        )}
        {!isCurrentUser && isFollowing && (
          <Button
            label="Unfollow"
            onClick={toggleFollow}
            disabled={isLoading}
            secondary
            className="px-5 py-2"
          />
        )}
      </div>
      <div className="mt-1 px-10">
        <p className="text-2xl font-bold text-white">
          {isCurrentData ? session.user.name : user.name}
        </p>
        <p className="text-xl text-neutral-500 font-bold">
          {isCurrentData ? "@" + session.user.username : "@" + user.username}
        </p>
        <div className="mt-3 flex flex-row text-neutral-500 items-center gap-x-3">
          <AiOutlineCalendar size={15} />
          <p>{createdAt}</p>
        </div>
        <div className="my-5">
          {user.bio ? (
            <p className="text-white text-md">
              {isCurrentData ? session.user.bio : user.bio}
            </p>
          ) : (
            <p className="text-neutral-500 text-md">This user has no bio</p>
          )}
        </div>
        <div className="flex flex-row gap-x-3 mt-5">
          <div className="flex flex-row gap-x-2">
            {user.followingIDs.length}
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row gap-x-2">
            {user.followersIDs.length}
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
