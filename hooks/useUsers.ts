import fetcher from "@/hooks/libs/fetcher";
import { UsersApiResponse } from "@/hooks/libs/userApiResponse";
import { useMemo } from "react";
import useSWR from "swr";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<UsersApiResponse>(
    `/api/users`,
    fetcher
  );
  return useMemo(
    () => ({ data, error, isLoading, mutate }),
    [data, error, isLoading, mutate]
  );
};

export default useUsers;
