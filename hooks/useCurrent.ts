import fetcher from "@/hooks/libs/fetcher";
import { UserApiResponse } from "@/hooks/libs/userApiResponse";
import useSWR from "swr";

const useCurrent = () => {
  const { data, isLoading, error, mutate } = useSWR<UserApiResponse>(
    "/api/current",
    fetcher
  );
  return { data, isLoading, error, mutate };
};

export default useCurrent;
