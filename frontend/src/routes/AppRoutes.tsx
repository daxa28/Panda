import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context";
import { pablicRoutes, privateRoutes } from "./Routes";
import Loader from "../components/Loader/Loader";

export default function AppRoutes() {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} element={route.component} path={route.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {pablicRoutes.map((route) => (
        <Route key={route.path} element={route.component} path={route.path} />
      ))}
    </Routes>
  );
}
