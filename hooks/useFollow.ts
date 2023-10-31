import { useCallback, useMemo, useState } from "react";
import useCurrent from "./useCurrent";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserApiResponse } from "@/libs/userApiResponse";


const useFollow = (followId: string) => {
  const { data: userData, isLoading: userLoading,mutate:mutateCurrent } = useCurrent();
  const { data: followData, isLoading: followLoading,mutate:mutateUser } = useUser(followId);
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const isFollowing = useMemo(() => {
    if (!userData?.data || !followData?.data) {
      return;
    }
    return followData.data.followersIDs.includes(userData.data.id);
  }, [followData, followLoading, userData, userLoading]);

  const toggleFollow = useCallback(async () => {
    if (isFollowing === undefined) {
      return () => {};
    }
    try {
      setIsLoading(true)
      if (isFollowing) {
        const res = await axios.delete<UserApiResponse>("/api/follow", {
          data: {
            unfollowId: followId,
          },
        });
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        toast.success("User unfollowed")
      } else {
        const res=await axios.post<UserApiResponse>("/api/follow",{
            followId
        })
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        toast.success("User followed")
      }
      mutateCurrent()
      mutateUser()
    } catch (err) {
        return toast.error((err as Error).message)
    }finally{
      setIsLoading(false)
    }
  }, [isFollowing]);

  return {isFollowing,toggleFollow,isLoading}
};

export default useFollow;
