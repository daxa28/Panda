import React from "react";
import * as styles from "./button.module.scss";

type ButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disable?: boolean;
};

function Button({ children, onClick, disable }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.btn} disabled={disable}>
      <span className={`${styles.lineTop} ${styles.line}`} />
      <span className={`${styles.lineRight} ${styles.line}`} />
      <span className={`${styles.lineBottom} ${styles.line}`} />
      <span className={`${styles.lineLeft} ${styles.line}`} />
      {children}
    </button>
  );
}

export default Button;
