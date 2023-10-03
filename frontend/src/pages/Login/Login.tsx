import * as styles from "./login.module.scss";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default function Login() {
  const { setIsAuth } = useContext(AuthContext);
  const [lodin, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login page</h2>
      <form onSubmit={login} className={styles.form}>
        <Input
          value={lodin}
          id="login"
          placeholder="login..."
          autoComplete="on"
          type="text"
          onChange={setLogin}
        />
        <Input
          value={password}
          id="password"
          placeholder="password..."
          autoComplete="on"
          type="password"
          onChange={setPassword}
        />
        <div className={styles.btn}>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
}
