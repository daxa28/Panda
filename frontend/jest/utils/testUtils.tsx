import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import luckReducer from "../../src/core/redux/slices/luckSlice";
import postsReducer from "../../src/core/redux/slices/postsSlice";
import bookReducer from "../../src/core/redux/slices/bookSlice";
import booksReducer from "../../src/core/redux/slices/booksSlice";
import createSagaMiddleware from "redux-saga";

import type { store, RootState } from "../../src/core/redux/store";
// В качестве базовой настройки, импортируем те же самые slice reducers

// Интерфейс этого типа расширяет параметры по умолчанию для рендеринга из RTL,
// а также позволяет пользователю указывать другие вещи, такие как initialState, store
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  booksReduser: booksReducer,
  bookReduser: bookReducer,
  luckReducer: luckReducer,
  postsReducer: postsReducer,
});

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // // Автоматически создаем экземпляр store, если store не был передан
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          // {thunk: false}
          .concat(sagaMiddleware),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Возвращаем объект со store и всеми функциями запроса RTL
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
