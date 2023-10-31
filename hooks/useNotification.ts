import fetcher from "@/libs/fetcher";
import NotificationApiResponse from "@/libs/notificationApiResponse";
import useSWR from "swr";

const useNotification = () => {
  const { data, isLoading, mutate } = useSWR<NotificationApiResponse>(
    "/api/notification",
    fetcher
  );
  return { data, isLoading, mutate };
};

export default useNotification;
