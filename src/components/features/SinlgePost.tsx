import { AppUseSelector } from "../Redux/ReduxHooks"
import { selectPostById } from "./PostFeatures";


import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import Reaction from "./Reaction";

export default function SinlgePost() {

  const {singlePostId} = useParams();

 
  const posts = AppUseSelector( (state)=>selectPostById(state,Number(singlePostId)) );

  return (
    <div>
      
      {posts && posts.title}
      { posts && <Reaction insidePOST={posts} /> }
      <Link to={`/post/edit/${posts.id}`} >Edit post</Link>
      {singlePostId && singlePostId}
    </div>
  )
}
