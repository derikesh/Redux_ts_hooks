

// we would need to define action and action creater for the action used in reducer by ourselves 


// this is action type defination
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// and this is action creator with just a function retruning a type object since it is what action returns , a type which needs a action type
export const increment = ()=>({ type : INCREMENT });
export const decrement = ()=>({type:DECREMENT});





// we then create a reducer which uses a action and a state for updating the immutable datas 
// the action types are used in reducer to define and identify the function

// in reducer we set the initalValue or state 

const initialState = {
    value : 0
};




// before creating a reducer function which takes current state and action we would need to pass state and action to it 

function reducerFunction( state = initialState , action ){

        switch(action.type){

            case INCREMENT :
                return { ...state , value : state.value + 1 };

            case DECREMENT :
                return { ...state,value : state.value -1 };    

            default :
                return state;

        }

}





// after creating a action type , action creator and a reducer function we can finally set a store which is the main storing point for handling the single 
// truth or state of whole application project 


// createStore has been depiracted so we will be using rtk configureStore instead 
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:reducerFunction
})

export default store;