import UserDocument from "./UserDocument";

interface NotificationDocument {
  id: string;
  userId: string;
  user: UserDocument;
  body: string;
}

export default NotificationDocument;
