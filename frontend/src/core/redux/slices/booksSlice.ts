import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type VolumeInfo = {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
  categories: string[];
  description: string;
};

export type ImageLinks = {
  thumbnail?: string;
};

export type BookType = {
  id: string;
  volumeInfo: VolumeInfo;
};

export type DataBooks = {
  totalItems: number;
  items: BookType[];
};

export type BooksStateType = {
  totalItems: number;
  items: BookType[];
  isLoading: boolean;
  error: string;
  isLoadingNextBooks: boolean;
  errorNextBooks: string;
};

const initialState: BooksStateType = {
  totalItems: 0,
  items: [],
  isLoading: false,
  error: "",
  isLoadingNextBooks: false,
  errorNextBooks: "",
};

export const BOOKS = "books";
export type BOOKS = typeof BOOKS;

export const GET_BOOKS = `${BOOKS}/getBooksAction`;
export type GET_BOOKS = typeof GET_BOOKS;

export const GET_NEXT_BOOKS = `${BOOKS}/getNextBooksAction`;
export type GET_NEXT_BOOKS = typeof GET_NEXT_BOOKS;

export const booksSlice = createSlice({
  name: BOOKS,
  initialState,
  reducers: {
    getBooksAction: (state: BooksStateType, {}) => {
      state.isLoading = true;
      state.error = "";
    },
    getBooksSuccessAction: (
      state: BooksStateType,
      { payload: data }: PayloadAction<DataBooks>
    ) => {
      state.isLoading = false;
      state.items = data.items;
      state.totalItems = data.totalItems;
    },
    getBooksErrorAction: (
      state: BooksStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = error;
    },
    getNextBooksAction: (state: BooksStateType, {}) => {
      state.isLoadingNextBooks = true;
      state.errorNextBooks = "";
    },
    getNextBooksSuccessAction: (
      state: BooksStateType,
      { payload: data }: PayloadAction<DataBooks>
    ) => {
      state.isLoadingNextBooks = false;
      if (state.items && data.items) {
        state.items = state.items.concat(data.items);
      } else if (!data.items) {
        state.errorNextBooks = "Oops... No more books found at this time.";
      }
    },
    getNextBooksErrorAction: (
      state: BooksStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.errorNextBooks = error;
    },
  },
});

export const {
  getBooksAction,
  getBooksSuccessAction,
  getBooksErrorAction,
  getNextBooksAction,
  getNextBooksSuccessAction,
  getNextBooksErrorAction,
} = booksSlice.actions;

export const booksSelector = (state: RootState) => state.booksReduser;

export default booksSlice.reducer;
