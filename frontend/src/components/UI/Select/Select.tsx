import React from "react";
import * as styles from "./select.module.scss";

type Option = {
  value: string;
  name: string;
};

type SelectProps = {
  options: Option[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
};

const Select = ({ options, defaultValue, value, onChange }: SelectProps) => {
  return (
    <select
      id={`${options}`}
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option style={{ display: "none" }} disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default Select;
