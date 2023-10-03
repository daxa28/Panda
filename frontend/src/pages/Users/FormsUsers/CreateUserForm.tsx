import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER } from "../../../core/graphql/mutations/user";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
import * as styles from "./form.module.scss";
import Input from "../../../components/UI/Input/Input";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch: () => void;
};

function CreateUserForm({ visible, setVisible, refetch }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const createUserFn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (email === "") {
      setError("Oops... Enter email.");
    } else {
      createUser({
        variables: {
          createUser: {
            email,
            name,
          },
        },
      }).then(() => {
        setEmail("");
        setName("");
        setError("");
        setVisible(false);
        refetch();
      });
    }
  };

  return (
    <Modal visible={visible} setVisible={setVisible} setError={setError}>
      <>
        <h3 className={styles.title}>New User</h3>
        <form className={styles.container}>
          <p className={styles.text}>Email:</p>
          <Input
            value={email}
            id="email"
            placeholder="email..."
            autoComplete="on"
            type="email"
            onChange={setEmail}
          />
          {error && <p className={styles.message}>{error}</p>}

          <p className={styles.text}>Name:</p>
          <Input
            value={name}
            id="name"
            placeholder="name..."
            autoComplete="on"
            type="text"
            onChange={setName}
          />
          <Button
            onClick={(e: React.MouseEvent<HTMLElement>) => createUserFn(e)}
          >
            Create
          </Button>
        </form>
      </>
    </Modal>
  );
}

export default CreateUserForm;
