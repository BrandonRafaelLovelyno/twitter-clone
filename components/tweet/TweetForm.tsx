"use client";

import React, { useState } from "react";
import Avatar from "../Avatar";
import useCurrent from "@/hooks/useCurrent";
import { motion as m } from "framer-motion";
import Button from "../Button";
import axios from "axios";
import {toast} from "react-hot-toast";
import ApiResponse from "@/libs/apiResponse";

const TweetForm = () => {
  const { data, isLoading:fetchingLoading } = useCurrent();
  const [body, setBody] = useState<string>("");
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const onSubmit = async () => {
    try{
      setIsLoading(true)
      if(!body){
        throw new Error("Tweet something!")
      }
      const res=await axios.post<ApiResponse>('/api/post',{body})
      if(!res.data.success){
        throw new Error(res.data.message)
      }
      toast.success("Success tweeting")
      setBody('')
    }catch(err){
      toast.error((err as Error).message)
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <m.div
      className="flex flex-col w-full px-3 py-5 gap-y-3 bg-neutral-800 rounded-lg justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={fetchingLoading || !data?.data ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-row gap-x-5">
        <Avatar userId={data?.data.id || ""} hasBorder isLarge={false} />
        <textarea
          className="bg-transparent placeholder:font-bold w-full focus:outline-none focus:border-0"
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
            setBody(e.currentTarget.value);
          }}
          value={body}
          placeholder={`Whats poppin, ${data?.data.name}?`}
        />
      </div>
      <div className="flex flex-row justify-end">
          <Button className="px-3 text-sm" label="Tweet!" onClick={onSubmit} disabled={isLoading} />
      </div>
    </m.div>
  );
};

export default TweetForm;
