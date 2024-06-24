import { selectPostById } from "../features/PostFeatures"
import {  AppUseSelector } from "../Redux/ReduxHooks"
import { selectUserById } from "../features/PostFeatures";
import { Link, useParams } from "react-router-dom";

import { PosyByUserId } from "../features/PostFeatures";


export default function UserPage() {

  const {userId} = useParams();

  const selectedUser = AppUseSelector( (state) => selectUserById( state , Number(userId) ) );

  const newPost = AppUseSelector( (state)=>PosyByUserId( state,Number(userId) ) )?.map( (item:any)=> (
    <li><Link to={`/post/${item.id}`} >{item.title}</Link></li>
  ) );;



  return (
    <div>
      <h1>{selectedUser?.name}</h1>
      {newPost}
    </div>
  )
}
