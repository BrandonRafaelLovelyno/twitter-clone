import NotificationDocument from "./NotificationDocument";

interface NotificationApiResponse {
  success: boolean;
  message: string;
  data: [NotificationDocument];
}

export default NotificationApiResponse;
