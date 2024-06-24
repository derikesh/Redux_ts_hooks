import { CreateApi, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = '';

const storeApi = createApi({
        reducerPath:'sds',
        baseQuery:fetchBaseQuery({
            baseUrl:'sdsadas',
            prepareHeaders(headers){
                headers.set('x-f',BASE_URL)
                return headers;
            }
        }),
        endpoints(builder){
            return {
                
            }
        }
})