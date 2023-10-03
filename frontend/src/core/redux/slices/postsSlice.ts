import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type PostType = {
  id: number;
  title: string;
  body: string;
};

export type PostsStateType = {
  data: PostType[] | [];
  isLoading: boolean;
  error: string;
};

const initialState: PostsStateType = {
  data: [],
  isLoading: false,
  error: "",
};

export const POSTS = "posts";
export type POSTS = typeof POSTS;

export const GET_POSTS = `${POSTS}/getPostsAction`;
export type GET_POSTS = typeof GET_POSTS;

export const postsSlice = createSlice({
  name: POSTS,
  initialState,
  reducers: {
    getPostsAction: (state: PostsStateType) => {
      state.isLoading = true;
      state.error = "";
    },
    getPostsSuccessAction: (
      state: PostsStateType,
      { payload: posts }: PayloadAction<[PostType]>
    ) => {
      state.isLoading = false;
      state.data = posts;
    },
    getPostsErrorAction: (
      state: PostsStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPostsAction, getPostsSuccessAction, getPostsErrorAction } =
  postsSlice.actions;

// Selector
export const postsSelector = (state: RootState) => state.postsReducer;

// Reducer
export default postsSlice.reducer;
