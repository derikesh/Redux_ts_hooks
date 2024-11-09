// now for the part of craeting a slicer we include actiontype , action creator and redcuer function all in once place
import { createSlice } from "@reduxjs/toolkit";


const counterSlicer = createSlice({
    name :'counter',  //this has to be the action type or name 
    initialState : {value : 0}, //this is the initalValye 
    reducers : {  //this will be the reducer functions

      incrementRe(state){
        state.value ++;
      },

      decrement(state){
        state.value--;
      }

    }
});


export const { incrementRe , decrement } = counterSlicer.actions;
export default counterSlicer.reducer ;




// now for the part of conguiring the store 
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        counter:counterSlicer.reducer
    }
})



// to use the value of state we need to go through the reducer counter and then only into its value  like counter.value using useSelector