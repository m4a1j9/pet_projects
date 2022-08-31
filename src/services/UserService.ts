import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IUser } from "../store/types/usersReducerTypes";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://625141c0e3e5d24b342af433.mockapi.io/multiBase",
    }),
    tagTypes: ["Post"],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], number>({
            query: () => ({
                url: "/users",
            }),
            providesTags: (result) => ["Post"],
        }),
        fetchLoginUser: build.query<IUser[], number>({
            query: (id: number) => ({
                url: "/users",
                params: {
                    _id: id,
                },
            }),
            providesTags: (result) => ["Post"],
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Post"],
        }),
        updateUser: build.mutation<IUser[], IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["Post"],
        }),
        deleteUser: build.mutation<IUser[], IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});
