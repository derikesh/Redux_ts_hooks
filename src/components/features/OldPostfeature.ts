import {  createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import { addSeconds, set, sub } from "date-fns";
import { userProps } from "./UserFeatures";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

interface AxiosPostProps {
    posts : Array<any>,
    status:string,
    error: string | any,
    count:number
}

const initialState:AxiosPostProps = {
    posts : [  ],
    status : 'idle',   
    error : null,
    count:0
}

// creat asyn thunk uses extraReducer function which then has some builder object withs some cases that we can add like builder.addCase(fetchApi.fullfilled | pending | rejected )

export const fetchApi = createAsyncThunk( '/posts/blog' , async ()=>{
    try {
        let axiosDate = await axios.get(POSTS_URL);
        return axiosDate.data;
        
    }catch(err){
        throw new Error("some error has occured");
    }
} );


export const addNewPost = createAsyncThunk( 'posts/addNewPost', async (intialPostVlaues:{title:string,body:string,userId:number})=>{
           try {
            const newData = await axios.post( POSTS_URL , intialPostVlaues );
            return newData.data
           }catch(err){
             throw new Error();
           }
} );


export const updatePost = createAsyncThunk( 'posts/updatePost', async ( initalPost:{id:number,title:string,body:string,userId:number,reactions:any} )=>{
            const id = Number(initalPost.id);
        try {
               
                const updateDatae = await axios.put( `${POSTS_URL}/${id}`,initalPost );
                return updateDatae.data;

        }catch(err){
            console.error( "some error occured" )
        }

} )



export const deletePost = createAsyncThunk( 'posts/deleteItem', async (initalPost:{id:number})=>{

    const id = Number(initalPost.id);

        try {
                const deletedItem = await axios.delete( `${POSTS_URL}/${id}` );
                if( deletedItem.status == 200 ) return initalPost;
                return `${deletedItem.status} : ${deletedItem.statusText}`
        }catch(err){
            throw new Error("Some error occured while")
        }
} )


const postSlice = createSlice({
    name:'postSlicePath',
    initialState,
    reducers:{        
        //    addPost:{
        //     // reducer function takes the same argument and does very much same as our previous function but for a function reducer with state and action parameter
        //         reducer(state,action:PayloadAction<any>){
        //             state.posts.push(action.payload)
        //         },

        //         // prepare function is another function which takes the argument that we are impluing in , here title and content is 1 os them 
        //         prepare(title,content,userID){        
                            
        //             return{
        //                 payload:{
        //                     id:nanoid(),
        //                     title,
        //                     content,
        //                     userID,
        //                     time:new Date().toISOString(),
        //                     reactions:{
        //                         thumbs:0,
        //                         clap:0,
        //                         hot:0,
        //                         kiss:0
        //                     }
        //                 }
        //             }
        //         }
        //    } ,

      reactionAdded(state,action){
        const { postId , reaction } = action.payload;
        const existingPost = state.posts.find( post => post.id === postId);
        if(existingPost){
            (existingPost.reactions as any )[reaction]++;
        }
      },   

      incrementCounter(state){
        state.count++
      }
    
           
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchApi.pending , (state,_action)=>{
                state.status = 'pending'
            })
            .addCase( fetchApi.fulfilled , (state,action) =>{
                state.status = 'successful';

                let min = 1;
                const loadedPost = action.payload.map( (post:any) => {
                    post.time = sub(new Date(),{ minutes:min++ }).toISOString();
                    post.reactions = {
                        thumbs:0,
                        kiss:0,
                        clap:0,
                        hot:0
                    };
                    return post;
                } );

                state.posts = state.posts.concat(loadedPost);
                

            } )
            .addCase(fetchApi.rejected , (state,action)=>{
                    state.status = 'failed';
                    state.error = action.error.message
            })
            .addCase( addNewPost.fulfilled, (state,action)=>{
                    // sincw we post a new post into the server which do not initally have userId , reaction and time so 
                    action.payload.userID = Number(action.payload.userID);
                    action.payload.id = nanoid();   
                    action.payload.time = new Date().toISOString();
                    action.payload.reactions = {
                        thumbs:0,
                        kiss:0,
                        clap:0,
                        hot:0
                    }
                    state.posts.push(action.payload);
            } )
           .addCase( updatePost.fulfilled, (state,action)=>{
            
            
            if(!action.payload?.id){
                console.log("some error occureduing the update post")
            }

            const {id} = action.payload;
            action.payload.time = new Date().toISOString();
            const posts = state.posts.filter( post => post.id != id );
            state.posts = [...posts , action.payload];

                    
        } )

        .addCase( deletePost.fulfilled , (state,action)=>{         
             
             const {id} = action.payload as {id:number};            
            const deletedFilert = state.posts.filter( post => post.id !== id );
            state.posts = deletedFilert;
        } )
    }
 
})




export const {reactionAdded,incrementCounter} = postSlice.actions;

// custome selector 
// export const selectPostById = (state:{ firstReducer: AxiosPostProps,userReducerStore: any[] },postId:number)=>
//             state.firstReducer.posts.find( post=>post.id === postId );


export const selectPostById = (state: { firstReducer: AxiosPostProps; userReducerStore: userProps[]; }, postId: number) => 
    state.firstReducer.posts.find(post => post.id === postId);



export const selectUserById = (state:{firstReducer:AxiosPostProps; userReducerStore:userProps[]},userId:number)=> {
    return  state.userReducerStore.find( user => user.id === userId );

}

const selectAllPost = (state:{firstReducer:AxiosPostProps; userReducerStore:userProps[]})=>state.firstReducer.posts;

// craeteSelector is memozied selecrtor which looks after the input selctor and gives memozied output
export const PosyByUserId = createSelector(
    [ selectAllPost, (state,userId:number)=>userId ],
    (post,userId) => post.filter( post => post.userId === userId )
)

export const PostSliceReducer = postSlice.reducer;




