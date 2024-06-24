import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BAE_URL = 'https://jsonplaceholder.typicode.com/users';

export interface userProps {
    id:number,
    username:string
    name:string
}

export const userAPi = createAsyncThunk( 'users/fetchUsers', async ()=>{
        try{
            let axiosDate:userProps[] = (await axios.get(BAE_URL)).data;
            return axiosDate;
            
        }catch(err){
            throw new Error("Some error occured during fetching api");
        }
} );


const initialState:Array<any> = [

]

const userFeatures = createSlice({
    name:'users',
    initialState,
    reducers:{
               
    },
    extraReducers(builder){
        builder
            .addCase( userAPi.fulfilled,(_state,action)=>{
                return action.payload;
            } )     
    }
});



export const UserReducer  = userFeatures.reducer;