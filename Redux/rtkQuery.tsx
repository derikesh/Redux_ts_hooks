// for the rtk query we can create a redux toolkit for some specific api which then could be used as base url and manage all the fetch data in endpoints 
// redux provides some hooks for our enpoints which could be used to trigger those endpoints or calls in api 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const  baseUrl = fetchBaseQuery({
    baseUrl:'someurl',
    prepareHeaders: (header)=>{
        let token = "";
        if( typeof window !== 'undefined' ){
            token = localStorage?.getItem('headerToken') || "";
        } 
        if(token){
            header.set('authentication',`Bearer ${token}`)
        }

        return header ;
    }
})

const api = createApi({
    reducerPath:'api',
    baseQuery: baseUrl,
    tagTypes:[
        "this",
        "maketag"
    ],
   endpoints : (builder)=>({

        someendpoit : builder.query({
            query: (query)=>({
                method:'GET',
                url:`users/${query}`
            })
        }),

        anotherMutation : builder.mutation({
            query : (body)=>({
                method:'POST',
                url:'somei',
                body,
            }),
            invalidatesTags:["maketag"],
        })

   })
})

export const { useSomeendpoitQuery } = api;