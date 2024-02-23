"use client";

import axios from "axios";
import React, { useMemo } from "react";
import Modal from "./Modal";
import Input from "../input/Input";
import { useState, useCallback } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import ApiResponse from "@/hooks/libs/apiResponse";
import Loader from "../Loader";

const RegisterModal = () => {
  const useRegister = useRegisterModal();
  const useLogin = useLoginModal();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/register", {
        email,
        name,
        username,
        password,
      });

      const response: ApiResponse = data;

      if (!response.success) {
        throw new Error(response.message);
      }

      signIn("credentials", {
        email,
        password,
      });

      toast.success("Register success");

      useRegister.onClose();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [useRegister, email, username, name, password]);

  const onClose = useCallback(() => {
    useRegister.onClose();
  }, [useRegister]);

  const onToggle = useCallback(() => {
    useRegister.onClose();
    useLogin.onOpen();
  }, [useLogin, useRegister]);

  const footerContent: React.ReactElement = useMemo(
    () => (
      <p>
        Already have an account?
        <button onClick={onToggle} className="font-bold text-blue-500 ml-2">
          Log In!
        </button>
      </p>
    ),
    [onToggle]
  );

  const bodyLoading: React.ReactElement = <Loader />;

  const bodyContent: React.ReactElement = (
    <div className="flex flex-col gap-y-4 w-full">
      <Input
        placeholder="Enter your email"
        value={email}
        disabled={isLoading}
        type="email"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <Input
        placeholder="Enter your name"
        value={name}
        disabled={isLoading}
        type="text"
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <Input
        placeholder="Enter your username"
        value={username}
        disabled={isLoading}
        type="text"
        onChange={(e) => {
          setUsername(e.currentTarget.value);
        }}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        disabled={isLoading}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
    </div>
  );
  return (
    <Modal
      title="Register"
      label="Create my account !"
      body={isLoading ? bodyLoading : bodyContent}
      onClose={onClose}
      isOpen={useRegister.isOpen}
      onSubmit={onSubmit}
      buttonClassName="w-full"
      secondary
      footer={footerContent}
      isLoading={isLoading}
    />
  );
};

export default RegisterModal;
