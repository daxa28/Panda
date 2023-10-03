import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { luckSlice } from "./slices/luckSlice";
// import { createLogger } from "redux-logger";
import postsReducer from "./slices/postsSlice";
import booksReducer from "./slices/booksSlice";
import bookReducer from "./slices/bookSlice";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "./saga/index";

// const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  booksReduser: booksReducer,
  bookReduser: bookReducer,
  luckReducer: luckSlice.reducer,
  postsReducer: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // {thunk: false}
      // .concat(loggerMiddleware)
      .concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootWatcher);

// Выводим типы `RootState` и `AppDispatch` из самого хранилища
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
