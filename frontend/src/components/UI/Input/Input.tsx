import React, { RefObject } from "react";
import * as styles from "./input.module.scss";

interface InputProps {
  id: string;
  placeholder: string;
  autoComplete: string;
  type: string;
  value: string;
  inputEl: RefObject<HTMLInputElement>;
  onChange: (e: string) => void;
  onKeyDownFn?: () => void;
}

function Input({
  id,
  placeholder,
  autoComplete,
  type,
  value,
  onChange,
  inputEl,
  onKeyDownFn,
}: InputProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (onKeyDownFn) {
      if (e.key === "Enter") {
        onKeyDownFn();
      }
    }
  }

  return (
    <input
      id={id}
      ref={inputEl}
      autoComplete={autoComplete}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
}

export default Input;
