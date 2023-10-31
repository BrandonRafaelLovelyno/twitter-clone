import fetcher from "@/libs/fetcher";
import PostApiResponse from "@/libs/postApiResponse";
import PostsApiResponse from "@/libs/postsApiResponse";
import useSWR from "swr";

interface UsePostParams {
  userId?: string;
  postId?: string;
}

const usePost = (params?: UsePostParams) => {
  let url = "";
  if (!params) {
    url = "/api/post";
  } else if (!params.userId && params.postId) {
    url = `/api/post/${params.postId}`;
  } else if (!params.postId && params.userId) {
    url = `/api/post?userId=${params.userId}`;
  }

  if (!params?.postId) {
    const { data, error, isLoading, mutate } = useSWR<PostsApiResponse>(
      url,
      fetcher
    );
    return { data, error, isLoading, mutate };
  } else {
    const { data, error, isLoading, mutate } = useSWR<PostApiResponse>(
      url,
      fetcher
    );
    return { data, error, isLoading, mutate };
  }
};

export default usePost;
