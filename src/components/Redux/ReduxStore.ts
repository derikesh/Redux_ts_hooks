import { configureStore } from "@reduxjs/toolkit";
import {  PostSliceReducer } from "../features/PostFeatures";


// store is responsible for state management and dispatch management
import { UserReducer } from "../features/UserFeatures";
export const store = configureStore({
    reducer:{
        firstReducer:PostSliceReducer,
        userReducerStore : UserReducer,
    },       
    

})


export type TypeAppDispatch = typeof store.dispatch;
export type TypeRootstate = ReturnType<typeof store.getState>;