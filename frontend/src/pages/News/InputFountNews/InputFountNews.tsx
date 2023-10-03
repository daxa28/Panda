import React, { useState } from "react";
import * as styles from "./inputFountNews.module.scss";

interface InputProps {
  id: string;
  placeholder: string;
  autoComplete: string;
  type: string;
  onKeyDown: (v: string) => void;
}

function InputFountNews({
  id,
  placeholder,
  autoComplete,
  type,
  onKeyDown,
}: InputProps) {
  const [value, setValue] = useState("");

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      onKeyDown(value);
    }
  }

  return (
    <input
      id={id}
      autoComplete={autoComplete}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      onKeyDown={handleKeyDown}
    />
  );
}

export default InputFountNews;
