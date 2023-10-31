import PostDocument from "./PostDocument";
import UserDocument from "./UserDocument";

export default interface CommentDocument{
    id:string;
    body:string;
    createdAt:Date;
    updatedAt:Date;
    userId:string;
    postId:string;
    populated:boolean;
    user:UserDocument;
    post:PostDocument;
}