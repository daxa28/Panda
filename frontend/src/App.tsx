import * as commonStyles from "./assets/styles/common.module.scss";
import * as styles from "./app.module.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthContext } from "./context";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <Router>
        <div className={styles.wrapper}>
          <Header />
          <main className={[commonStyles.container, styles.content].join(" ")}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
