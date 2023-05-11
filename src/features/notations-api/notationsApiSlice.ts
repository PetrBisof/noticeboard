import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Comment, User } from "../../ts/interfaces";

type PostsResponse = Post[];
type CommentResponse = Comment[];
type UserResponse = User[];

// create the API using createApi from Redux Toolkit
export const notationsApi = createApi({
  reducerPath: "notationsAp",

  // set up the base query used by all endpoints
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  // define the endpoints for the API
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => "users",
    }),

    getComments: builder.query<CommentResponse, void>({
      query: () => "comments",
    }),

    getPosts: builder.query<PostsResponse, void>({
      query: () => "posts",
    }),
  }),
});

// destructure the generated hooks for each endpoint
export const { useGetUsersQuery, useGetCommentsQuery, useGetPostsQuery } =
  notationsApi;
