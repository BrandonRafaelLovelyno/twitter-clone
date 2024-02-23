"use client";

import React, { useCallback } from "react";
import Modal from "./Modal";
import Input from "../input/Input";
import { useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader";
import { UserApiResponse } from "@/hooks/libs/userApiResponse";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const useLogin = useLoginModal();
  const useRegister = useRegisterModal();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.post<UserApiResponse>("/api/login", {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      await signIn("credentials", { email, password, redirect: false });
      toast.success("login success");
      useLogin.onClose();
      router.replace("/");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [router, useLogin, email, password]);

  const onClose = useCallback(() => {
    useLogin.onClose();
  }, [useLogin]);

  const onToggle = useCallback(() => {
    useLogin.onClose();
    useRegister.onOpen();
  }, [useLogin, useRegister]);

  const footerContent: React.ReactElement = (
    <p>
      Do not have an account?
      <button onClick={onToggle} className="font-bold text-blue-500 ml-2">
        Sign In!
      </button>
    </p>
  );

  const bodyLoading = <Loader />;

  const bodyContent: React.ReactElement = (
    <div className="flex flex-col gap-y-4 w-full">
      <Input
        placeholder="Enter your email"
        value={email}
        disabled={isLoading}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        type="email"
      />
      <Input
        placeholder="Enter your password"
        value={password}
        disabled={isLoading}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        type="password"
      />
    </div>
  );
  return (
    <Modal
      title="Login"
      label="Login"
      body={isLoading ? bodyLoading : bodyContent}
      onClose={onClose}
      isOpen={useLogin.isOpen}
      onSubmit={onSubmit}
      buttonClassName="w-full"
      secondary
      footer={footerContent}
      isLoading={isLoading}
    />
  );
};

export default LoginModal;
