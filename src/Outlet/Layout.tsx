import { Link, Outlet } from "react-router-dom";

import { incrementCounter } from "../components/features/PostFeatures";
import { AppUseDispatch, AppUseSelector } from "../components/Redux/ReduxHooks";

export default function Layout() {

  const buttonIncrement = AppUseDispatch();

  const countState = AppUseSelector( state => state.firstReducer.count );

  return (
    <div>
        <div style={{display:'flex',gap:"80px"}} >
            <Link to={'/'} >Home</Link>
            <Link to={'post'} > Posts </Link>
            <Link to={'user'} > Users </Link>
            <button onClick={ ()=> buttonIncrement(incrementCounter() ) } >{countState}</button>
        </div>
        <Outlet/>
    </div>
  )
}
