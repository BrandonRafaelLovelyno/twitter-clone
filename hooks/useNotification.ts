import fetcher from "@/hooks/libs/fetcher";
import NotificationApiResponse from "@/hooks/libs/notificationApiResponse";
import useSWR from "swr";

const useNotification = () => {
  const { data, isLoading, mutate } = useSWR<NotificationApiResponse>(
    "/api/notification",
    fetcher
  );
  return { data, isLoading, mutate };
};

export default useNotification;
