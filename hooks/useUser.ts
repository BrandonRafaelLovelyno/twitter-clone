import fetcher from "@/libs/fetcher";
import {UserApiResponse} from "@/libs/userApiResponse";
import useSWR from "swr";

const useUser=(userId:string)=>{
    const {data,error,isLoading,mutate}=useSWR<UserApiResponse>(`/api/user/${userId}`,fetcher,{
        revalidateOnFocus:true,
    })
    return {data,error,isLoading,mutate}
}

export default useUser;