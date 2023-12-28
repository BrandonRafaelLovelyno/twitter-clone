import PostDocument from "./PostDocument";

export default interface PostsApiResponse {
  data: PostDocument[];
  success: boolean;
  message: string;
}
