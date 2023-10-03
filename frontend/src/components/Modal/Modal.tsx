import React, { ReactElement } from "react";
import * as classes from "./modal.module.scss";

type ModalProps = {
  children: ReactElement;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setError?: (error: string) => void;
};

const Modal = ({ children, visible, setVisible, setError }: ModalProps) => {
  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => {
        setVisible(false);
        if (setError) {
          setError("");
        }
      }}
    >
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
