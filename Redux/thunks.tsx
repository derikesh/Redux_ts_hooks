// this will be the thunk know as middleware for handeling asycn functions 

// thunks are middleware function that returns a async function instead of a object 

// definnf action type and action cretor for a thunk 

export const REQUEST_THUNK = 'REQUEST_THUNK';
export const REQUEST_SUCESS= 'REQUEST_SUCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';


// definig a function that is thunk asyn function 

function fetchData(  ){
    //here this is returning a aysn function with d 
    return async function( dispatch ){

        // dispatching the request thunk first to make a request 
        dispatch( { type : REQUEST_THUNK } );

        // aftert creating a request we then move to sucess and error which we could use try and catch error handler

        try{

            // we can use the fetching thing here 
            const response = await fetch('/some url api ');
            const data = await response.json();

            // here since the data is there we can then dispatch the sucess action type 
            dispatch( {type:REQUEST_SUCESS , payload: data} )

        }catch(err){
            throw new Error(err.message);
            // dispatching the error action type here
            dispatch({type:REQUEST_ERROR});
        }

        }
}


// the above code is action creator but for thunks we can create function that returns a asyn function , so using this in our reducer function 

// for reducer we need state and action creator or action type 

const initialState = {
    loading : false,
    data : [],
    error: ''
}


// this is reducer function which will be stored in store 
function reducerFunction( state = initialState , action ){

    switch(action.type){

        case REQUEST_THUNK :
            return { ...state , loading : true }

        case REQUEST_SUCESS :
            return { ...state , loading:false,data : action.payload };
            
        case  REQUEST_ERROR :
            return { ...state , error : action.error }   
        
        default:
            return state;

    }

}



// configuring a store 
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : reducerFunction,
})


// this is then placed in root of project the global data point which is placed with help of provider from the redux itself 


// after which the function would be used using useDispatch 

import { useDispatch , useSelector } from "react-redux";


const dispatch = useDispatch();
// we will be using useSelctor to display the datas 
interface RootState {
    loading: boolean;
    data: any[];
    error: string;
}

const { loading , data, error } = useSelector((state: RootState) => state);

