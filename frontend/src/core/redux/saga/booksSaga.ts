import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  DataBooks,
  GET_BOOKS,
  GET_NEXT_BOOKS,
  getBooksErrorAction,
  getBooksSuccessAction,
  getNextBooksErrorAction,
  getNextBooksSuccessAction,
} from "../slices/booksSlice";

type PayloadActionBooks = {
  maxResults: number;
  searchBook: string;
  startIndex: number;
  category: string;
  orderBy: string;
};

function* fetchBooksWorker(action: PayloadAction<PayloadActionBooks>) {
  try {
    const response: AxiosResponse<DataBooks> = yield axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${
        action.payload.searchBook
      }${action.payload.category ? "+subject:" + action.payload.category : ""}`,
      {
        params: {
          orderBy: action.payload.orderBy,
          startIndex: action.payload.startIndex,
          maxResults: action.payload.maxResults,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    yield put(getBooksSuccessAction(response.data));
  } catch (error) {
    yield put(getBooksErrorAction(`${error}`));
  }
}

function* fetchNextBooksWorker(action: PayloadAction<PayloadActionBooks>) {
  try {
    const response: AxiosResponse<DataBooks> = yield axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${
        action.payload.searchBook
      }${action.payload.category ? "+subject:" + action.payload.category : ""}`,
      {
        params: {
          orderBy: action.payload.orderBy,
          startIndex: action.payload.startIndex,
          maxResults: action.payload.maxResults,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    yield put(getNextBooksSuccessAction(response.data));
  } catch (error) {
    yield put(getNextBooksErrorAction(`${error}`));
  }
}

export function* booksWatcher() {
  yield takeLatest(GET_BOOKS, fetchBooksWorker);
  yield takeLatest(GET_NEXT_BOOKS, fetchNextBooksWorker);
}
