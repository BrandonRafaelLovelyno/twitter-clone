import UserDocument from "./UserDocument";

export interface UsersApiResponse{
    data:[UserDocument];
    success:boolean;
    message:string;
}

export interface UserApiResponse{
    data:UserDocument;
    success:boolean;
    message:string;
}