import { Link } from "react-router-dom";
import { AppUseSelector } from "../Redux/ReduxHooks"


export default function UserList() {

    const userList = AppUseSelector( (state)=>state.userReducerStore );

    const userListComp = userList.map( (item)=> (
        <li><Link to={`${item.id}`} >{item.name}</Link></li>
    ) )

    return (
    <div>
        <h1>UserList</h1>
        <ul>
            {userListComp}
        </ul>
    </div>
  )
}
