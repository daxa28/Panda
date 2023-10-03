import React from "react";
import { ROUTES } from "./constants";
import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/page404";
import Login from "../pages/Login/Login";
import News from "../pages/News/News";
import Users from "../pages/Users/Users";
import Account from "../pages/Account/Account";
import Books from "../pages/Books/Books";
import Book from "../pages/Books/Book/Book";

export const privateRoutes = [
  { path: ROUTES.ERROR, component: <Page404 />, exact: true },
  { path: ROUTES.HOME, component: <Home />, exact: true },
  { path: ROUTES.LOGIN, component: <Account />, exact: true },
  { path: ROUTES.USERS, component: <Users />, exact: true },
  { path: ROUTES.NEWS, component: <News />, exact: true },
  { path: ROUTES.BOOKS, component: <Books />, exact: true },
  { path: ROUTES.BOOK, component: <Book />, exact: true },
  { path: ROUTES.USER_FOUND_BY_STRING, component: <Users />, exact: true },
  { path: ROUTES.USER_FOUND_BY_ID, component: <Users />, exact: true },
];

export const pablicRoutes = [
  { path: ROUTES.ERROR, component: <Page404 />, exact: true },
  { path: ROUTES.HOME, component: <Home />, exact: true },
  { path: ROUTES.LOGIN, component: <Login />, exact: true },
  { path: ROUTES.USERS, component: <Users />, exact: true },
  { path: ROUTES.NEWS, component: <News />, exact: true },
  { path: ROUTES.BOOKS, component: <Books />, exact: true },
  { path: ROUTES.BOOK, component: <Book />, exact: true },
  { path: ROUTES.USER_FOUND_BY_STRING, component: <Users />, exact: true },
  { path: ROUTES.USER_FOUND_BY_ID, component: <Users />, exact: true },
];
