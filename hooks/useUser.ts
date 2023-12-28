import fetcher from "@/hooks/libs/fetcher";
import { UserApiResponse } from "@/hooks/libs/userApiResponse";
import useSWR from "swr";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<UserApiResponse>(
    `/api/user/${userId}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useUser;
