import { AppUseSelector } from "../Redux/ReduxHooks";
import PostAuthor from "./PostAuthor";
import Reaction from "./Reaction";
import TimeAgo from "./TimeAgo";
import { selectPostById } from "./PostFeatures";
import { AxiosPostProps } from "./PostFeatures";
import { selectPostEntities } from "./PostFeatures";

import { Link } from "react-router-dom";

export default function PostExperts({ApiPost}:any) {


  const selectedPostSelected:any = AppUseSelector( (state)=>selectPostById(state,ApiPost) );

  console.log(selectedPostSelected);



  return (
    <div>        
        <article style={{background:'#123525',padding:'5px 10px',margin:'20px 0px'}}>
          <h3>{selectedPostSelected?.title}</h3>
          <p>{selectedPostSelected?.body}</p>
          <PostAuthor APiuserId={selectedPostSelected?.userId} />
        <TimeAgo timeStap={selectedPostSelected?.time} />
        <Reaction postKye={selectedPostSelected?.id} insidePOST = {selectedPostSelected} />
        <div>
          <Link to={`/post/${selectedPostSelected?.id}`}>
          View Post
          </Link>
        </div>
        </article>
    </div>
  )
}
