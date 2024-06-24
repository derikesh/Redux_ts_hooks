import { AppUseSelector } from "../Redux/ReduxHooks"
import React from "react";

interface PostAuthorProps {
  APiuserId: string;
}

const PostAuthor: React.FC<PostAuthorProps> = React.memo(({ APiuserId }) => {
  const users = AppUseSelector((state) => state.userReducerStore);

  const validUser = users.find((posts) => posts.id === APiuserId);


  return (
    <span>by {validUser ? validUser.name : 'Unknown author'}</span>
  );
});

export default PostAuthor;
