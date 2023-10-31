import { useMemo, useState } from "react";
import usePost from "./usePost";
import { useSession } from "next-auth/react";
import axios from "axios";
import ApiResponse from "@/libs/apiResponse";
import { toast } from "react-hot-toast";
import PostApiResponse from "@/libs/postApiResponse";

const useLike = (postId: string) => {
  const { data: session } = useSession();
  const {
    data: postData,
    isLoading: postLoading,
    mutate: mutatePost,
  } = usePost({ postId });
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);

  const hasLiked = useMemo(() => {
    if (postLoading) {
      setIsLikeLoading(true);
    } else {
      setIsLikeLoading(false);
    }
    if (!postData?.data || !postData.success || postLoading || !session?.user) {
      return false;
    }
    return (postData as PostApiResponse).data.likedIds.includes(
      session.user.userId
    );
  }, [postData?.data, postData?.success, session?.user, postLoading]);

  const toggleLike = useMemo(() => {
    let request;
    if (hasLiked) {
      request = async () => {
        setIsLikeLoading(true);
        try {
          const res = await axios.delete<ApiResponse>("/api/like", {
            data: { postId },
          });
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          mutatePost();
          toast.success("Post unliked");
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setIsLikeLoading(false);
        }
      };
    } else {
      request = async () => {
        setIsLikeLoading(true);
        try {
          const res = await axios.post<ApiResponse>("/api/like", {
            postId,
          });
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          mutatePost();
          toast.success("Post liked");
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setIsLikeLoading(false);
        }
      };
    }
    return request;
  }, [hasLiked]);

  return { hasLiked, toggleLike, isLikeLoading, postLoading };
};

export default useLike;
