import { TypeAppDispatch ,TypeRootstate} from "./ReduxStore";
import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";

export const AppUseSelector:TypedUseSelectorHook< TypeRootstate > = useSelector;
export const AppUseDispatch = ()=> useDispatch<TypeAppDispatch>();
