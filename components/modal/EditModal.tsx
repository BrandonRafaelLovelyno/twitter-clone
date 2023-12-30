"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../input/Input";
import useCurrent from "@/hooks/useCurrent";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import useEditModal from "@/hooks/useEditModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserApiResponse } from "@/hooks/libs/userApiResponse";
import FileInput from "../input/FileInput";
import Loader from "../Loader";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

export const dynamic = "force-dynamic";

const EditModal: React.FC = () => {
  const useEdit = useEditModal();
  const { data, isLoading: fetchLoading } = useCurrent();
  const { data: session, update: updateSession } = useSession();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch<UserApiResponse>("/api/edit", {
        name,
        username,
        image,
        coverImage,
        bio,
      });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      mutate("/api/current", true);
      mutate("/api/users", true);
      setIsLoading(false);
      await updateSession({ username, name, bio });
      toast.success("Editing success!");
      useEdit.onClose();
    } catch (err) {
      toast.error((err as Error).message);
      setIsLoading(false);
    }
  }, [updateSession, useEdit, name, username, image, coverImage, bio]);

  useEffect(() => {
    if (fetchLoading || !data?.data) {
      return;
    }
    if (!session) {
      return;
    }
    setName(session.user.name);
    setUsername(session.user.username);
    setImage(data.data.image || "");
    setCoverImage(data.data.coverImage || "");
    setBio(session.user.bio);
  }, [fetchLoading, data?.data, session]);

  const bodyFile = useMemo(() => {
    return (
      <div className="flex flex-row gap-x-5 justify-between mb-5">
        <FileInput
          value={image}
          disabled={isLoading}
          onChange={(base64: string) => {
            setImage(base64);
          }}
          placeholder="Drop your profile image!"
          className="rounded-full md:w-40 md:h-40 h-32 w-32 md:text-md text-sm"
          sizeHandle={() => {
            toast.error("File size is bigger than 1MB");
          }}
        />
        <FileInput
          value={coverImage}
          disabled={isLoading}
          onChange={(base64: string) => {
            setCoverImage(base64);
          }}
          placeholder="Drop your cover image!"
          className="flex-1 md:text-md text-sm"
          sizeHandle={() => {
            toast.error("File size is bigger than 1MB");
          }}
        />
      </div>
    );
  }, [isLoading, image, coverImage]);

  const body = (
    <div className="flex flex-col gap-y-4 w-full">
      {bodyFile}
      <Input
        placeholder="Edit your name"
        value={name}
        disabled={isLoading}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        type="text"
      />
      <Input
        placeholder="Edit your username"
        value={username}
        disabled={isLoading}
        onChange={(e) => {
          setUsername(e.currentTarget.value);
        }}
        type="text"
      />
      <Input
        placeholder="Edit your bio"
        value={bio}
        disabled={isLoading}
        onChange={(e) => {
          setBio(e.currentTarget.value);
        }}
        type="text"
      />
    </div>
  );

  const bodyLoading = <Loader />;

  return (
    <Modal
      body={isLoading ? bodyLoading : body}
      isOpen={useEdit.isOpen}
      onClose={useEdit.onClose}
      label="Edit!"
      onSubmit={onSubmit}
      title="Edit Profile"
      isLoading={false}
      hideButton={isLoading ? true : false}
      buttonClassName="w-full py-3"
      secondary
    />
  );
};

export default EditModal;
