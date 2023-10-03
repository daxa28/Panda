import { all } from "redux-saga/effects";
import { postsWatcher } from "./postsSaga";
import { booksWatcher } from "./booksSaga";
import { bookWatcher } from "./bookSaga";

export function* rootWatcher() {
  yield all([postsWatcher(), booksWatcher(), bookWatcher()]);
}
