import UserDocument from "./UserDocument";

export default interface PostDocument {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  likedIds: string[];
  image?: string;
  user:UserDocument
}
