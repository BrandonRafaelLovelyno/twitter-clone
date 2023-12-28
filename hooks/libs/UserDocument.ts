export default interface UserDocument{
    id:string;
    bio?:string;
    username:string;
    email:string;
    image?:string;
    name:string;
    coverImage?:string;
    createdAt:Date;
    followingIDs:String[];
    followersIDs:String[];
}
