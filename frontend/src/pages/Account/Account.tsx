import * as styles from "./account.module.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import Button from "../../components/UI/Button/Button";

function Account() {
  const { setIsAuth } = useContext(AuthContext);

  const login = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account page</h2>
      <div className={styles.btn}>
        <Button onClick={login}>Exit</Button>
      </div>
    </div>
  );
}

export default Account;
