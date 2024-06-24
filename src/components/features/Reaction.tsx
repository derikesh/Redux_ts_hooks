import {  reactionAdded } from "./PostFeatures";
import { AppUseDispatch } from "../Redux/ReduxHooks";

interface singleButtonReaction {
  insidePOST : any,
  postKye?:number
}

export default function Reaction({insidePOST}:singleButtonReaction) {


  const reactionEmoji = {
    thumbs: '👍',
    clap:'👏',
    hot:'🥵',
    kiss:'💋'
}

const buttonDispatch = AppUseDispatch();


  return (
    <div>
      { Object.entries(reactionEmoji).map( ([name,emoji],index)=>(
            <button key={index} onClick={ ()=>buttonDispatch(reactionAdded( {postId:insidePOST.id, reaction : name} )) } >
              {emoji} {(insidePOST.reactions as any)[name]}
            </button>
    ) )  }
    </div>
  )
}
