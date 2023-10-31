"use client";

import useLoginModal from "@/hooks/useLoginModal";
import React from "react";
import Button from "./Button";
import useRegisterModal from "@/hooks/useRegisterModal";

const Login = () => {
  const useLogin = useLoginModal();
  const useRegister = useRegisterModal();
  return (
    <div className="w-full h-fit px-3 py-2 flex flex-col gap-y-9 items-center justify-center">
      <p className="text-white font-bold text-2xl">Login to twitter !</p>
      <div className="w-full h-fit flex flex-row gap-x-5 justify-center">
        <Button
          className="flex-1 text-md"
          label="Login"
          onClick={() => {
            useLogin.onOpen();
          }}
        />
        <Button
          secondary
          className="flex-1 text-md"
          label="Sign in"
          onClick={() => {
            useRegister.onOpen();
          }}
        />
      </div>
    </div>
  );
};

export default Login;
