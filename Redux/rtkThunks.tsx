// this will be for the thunks created with rtk queries that will help in creating a middleware function used for fetching data from the api 

// this seems for the thunks we will be using extraReducer function in slice so from the start we can define like 


interface INITIALVALUE_INTERFACE {
    loading : boolean,
    data : any[],
    error:string
}

const initalValue = {
    loading : false,
    data : [],
    error : ''
}




// first we create slice 
import { createSlice } from "@reduxjs/toolkit";





// before creating a asyun fetching thunk we need to create a aysn function 
// the createAsyncThunk will allow us to get pending sucesss and rejected state which can be used in extraReducer builder cases 

import { createAsyncThunk } from "@reduxjs/toolkit";


const fetchData = createAsyncThunk( 'data/fetchingData' , async ()=>{
        const respoinse = await fetch('someurldata');
        
        if(!respoinse){
            throw new Error('some error occured during fetching data ');
        }

        const data = await respoinse.json();

        return data;

} )


const dataSlice = createSlice({
    name : 'dataFetching',
    initialState:initalValue,
    reducers:{

    },
    extraReducers:( builder )=>{
            builder
                   .addCase( fetchData.pending , (state)=>{
                    state.loading = true
                   } )
                   .addCase( fetchData.fulfilled , (state,action)=>{
                    state.loading = false
                    state.data = action.payload
                   } )
                   .addCase( fetchData.rejected ,(state,action)=>{
                    state.loading = true;
                    state.error = action.error.message || 'unkow error'
                   } )
    }
})