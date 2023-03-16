import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: "csmapi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API,
        // baseUrl: 'http://localhost:8000/'
    }),

    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (newUser) => {
                return {
                    url: "cms/restaurant/signup",
                    method: "POST",
                    body: newUser,
                };
            },
        }),
        login: builder.mutation({
            query: (oldUser) => {
                return {
                    url: "cms/restaurant/login",
                    method: "POST",
                    body: oldUser,
                };
            },
        }),
        updateItems: builder.mutation({
            query: (data) => {
                return {
                    url: "cms/restaurant/menu/addOrUpdate",
                    method: "POST",
                    body: data,

                };
            },
        }),
        removeItems: builder.mutation({
            query: (items) => {
                return {
                    url: "cms/restaurant/menu/remove",
                    method: "POST",
                    body: items,
                };
            },
        })
    }),
});

export const { useSignupMutation, useLoginMutation, useRemoveItemsMutation, useUpdateItemsMutation } = userAPI;