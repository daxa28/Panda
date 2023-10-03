import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { PostType, GET_POSTS } from "../slices/postsSlice";
import {
  getPostsErrorAction,
  getPostsSuccessAction,
} from "../slices/postsSlice";

function* fetchPostsWorker() {
  try {
    const response: AxiosResponse<[PostType]> = yield axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    yield put(getPostsSuccessAction(response.data));
  } catch (error) {
    yield put(getPostsErrorAction(`${error}`));
  }
}

export function* postsWatcher() {
  yield takeLatest(GET_POSTS, fetchPostsWorker);
}
