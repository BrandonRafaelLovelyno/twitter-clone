import PostDocument from "./PostDocument";

export default interface PostApiResponse{
    data:PostDocument;
    success:boolean;
    message:string;
}