import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  GET_BOOK,
  getBookErrorAction,
  getBookSuccessAction,
} from "../slices/bookSlice";
import { BookType } from "../slices/booksSlice";

type PayloadActionBook = {
  id: string;
};

function* fetchBookWorker(action: PayloadAction<PayloadActionBook>) {
  try {
    const response: AxiosResponse<BookType> = yield axios.get(
      `https://www.googleapis.com/books/v1/volumes/${action.payload.id}`
    );
    yield put(getBookSuccessAction(response.data));
  } catch (error) {
    yield put(getBookErrorAction(`${error}`));
  }
}

export function* bookWatcher() {
  yield takeLatest(GET_BOOK, fetchBookWorker);
}
