import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BookType } from "./booksSlice";

export type BookStateType = {
  data: BookType | null;
  isLoading: boolean;
  error: string;
};
const initialState: BookStateType = {
  data: null,
  isLoading: false,
  error: "",
};

export const BOOK = "book";
export type BOOK = typeof BOOK;

export const GET_BOOK = `${BOOK}/getBookAction`;
export type GET_BOOK = typeof GET_BOOK;

export const bookSlice = createSlice({
  name: BOOK,
  initialState,
  reducers: {
    getBookAction: (state: BookStateType, {}) => {
      state.isLoading = true;
      state.error = "";
    },
    getBookSuccessAction: (
      state: BookStateType,
      { payload: book }: PayloadAction<BookType>
    ) => {
      state.isLoading = false;
      state.data = book;
    },
    getBookErrorAction: (
      state: BookStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const { getBookAction, getBookSuccessAction, getBookErrorAction } =
  bookSlice.actions;

export const bookSelector = (state: RootState) => state.bookReduser;

export default bookSlice.reducer;
