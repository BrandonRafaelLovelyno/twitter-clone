import PostDocument from "@/hooks/libs/PostDocument";
import React from "react";
import TweetItem from "./TweetItem";

interface TweetFeedProps {
  posts?: PostDocument[];
}

const TweetFeed: React.FC<TweetFeedProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {posts
        ? posts.map((post) => <TweetItem key={post.id} post={post} />)
        : null}
    </div>
  );
};

export default TweetFeed;
