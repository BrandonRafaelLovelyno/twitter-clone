"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../input/Input";
import useCurrent from "@/hooks/useCurrent";
import { motion as m, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import useEditModal from "@/hooks/useEditModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserApiResponse } from "@/libs/userApiResponse";
import FileInput from "../input/FileInput";
import Loader from "../Loader";
import {useSWRConfig} from 'swr'

const EditModal: React.FC = () => {
  const useEdit = useEditModal();
  const {mutate:mutateFetchedData}=useSWRConfig()
  const {
    data,
    isLoading: fetchLoading,
  } = useCurrent();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bio,setBio]=useState<string>('')

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await axios.patch<UserApiResponse>("/api/edit", {
        name,
        username,
        image,
        coverImage,
        bio
      });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      await mutateFetchedData('/api/current')
      setIsLoading(false)
      toast.success('Editing success!')
      useEdit.onClose()
    } catch (err) {
      toast.error((err as Error).message);
      setIsLoading(false)
    }
  },[mutateFetchedData,name,username,image,coverImage,bio]);

  useEffect(() => {
    if (fetchLoading || !data?.data) {
      return;
    }
    setName(data.data.name);
    setUsername(data.data.username);
    setImage(data.data.image || "");
    setCoverImage(data.data.coverImage || "");
    setBio(data.data.bio||'')
  }, [fetchLoading, data?.data.username]);

  const bodyFile = useMemo(() => {
    return (
      <div className="flex flex-row gap-x-5 justify-between mb-5">
        <FileInput
          disabled={isLoading}
          onChange={(base64: string) => {
            setImage(base64);
          }}
          placeholder="Drop your profile image!"
          className="rounded-full md:w-40 md:h-40 h-32 w-32 md:text-md text-sm"
          sizeHandle={()=>{toast.error("File size is bigger than 1MB")}}
        />
        <FileInput
          disabled={isLoading}
          onChange={(base64: string) => {
            setCoverImage(base64);
          }}
          placeholder="Drop your cover image!"
          className="flex-1 md:text-md text-sm"
          sizeHandle={()=>{toast.error("File size is bigger than 1MB")}}
        />
      </div>
    );
  }, [image, coverImage]);

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

  const bodyLoading = (
    <Loader/>
  );

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default EditModal;
