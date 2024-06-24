import { AppUseSelector, AppUseDispatch } from "../Redux/ReduxHooks";
import { useEffect } from "react";
import { fetchApi } from "./PostFeatures";
import PostExperts from "./PostExperts";

import UserPage from "../Posts/UserPage";
import { selectAllPosts, selectPostById, selectPostEntities, selectPostIds } from "./PostFeatures";
import { AxiosPostProps } from "./PostFeatures";

export default function PostList() {

  const AllPost:any = AppUseSelector( selectPostIds );

  // const ArrayPost = AppUseSelector((state) => state.firstReducer.posts);

  const apiStatus = AppUseSelector((state) => state.firstReducer.status);




  let content;
  if (apiStatus === "pending") {
    content = <p>loading</p>;
  } else if (apiStatus === "successful") {
    // const orderedPost = AllPost.slice().sort((a:any, b:any) =>
    //   b.time.localeCompare(a.time)
    // );
    content = AllPost.map((postId:number,index:number) => <PostExperts key={index} ApiPost={postId} />);
  } else if (apiStatus === "failed") {
    content = <p>some error occurred</p>;
  }



  return (
    <>
      posts : {content}
    </>
  );
}
  