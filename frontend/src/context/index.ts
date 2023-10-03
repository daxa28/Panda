import { createContext, useContext } from "react";

export type AuthContent = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContent>({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: true,
});

export const useAuthContext = () => useContext(AuthContext);
