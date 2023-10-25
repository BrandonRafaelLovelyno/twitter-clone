"use client";

import React from "react";
import {BiSolidError} from 'react-icons/bi'

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = (error, reset) => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5 items-center justify-center">
      <p className="text-3xl text-white font-extrabold">
        {!error.error.cause
          ? "Something went wrong"
          : (error.error.cause as string)}
      </p>
      <p className="mt-5 text-white font-semibold text-xl">
        {error.error.message}
      </p>
      <div className="text-blue-500 mt-10">
      <BiSolidError size={200}/>
      </div>
    </div>
  );
};

export default Error;
