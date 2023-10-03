import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_USER } from "../../../core/graphql/mutations/user";
import { UserType } from "../Users";
import Modal from "../../../components/Modal/Modal";
import * as styles from "./form.module.scss";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

type Props = {
  visible: boolean;
  refetch: () => void;
  setVisible: (visible: boolean) => void;
  dataUpdateUser: UserType;
};

function UpdateUserForm({
  visible,
  refetch,
  setVisible,
  dataUpdateUser,
}: Props) {
  const [email, setEmail] = useState(dataUpdateUser.email);
  const [name, setName] = useState(dataUpdateUser.name);
  const [error, setError] = useState("");

  const [updateUser] = useMutation(UPDATE_USER);

  const updateUserFn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (email || name) {
      setError("");
      updateUser({
        variables: {
          updateUser: {
            id: dataUpdateUser.id,
            email: email ? email : dataUpdateUser.email,
            name: name ? name : dataUpdateUser.name,
          },
        },
      }).then(() => {
        setEmail("");
        setName("");
        setVisible(false);
        refetch();
      });
    } else {
      setError("Oops... Enter change.");
    }
  };

  return (
    <Modal visible={visible} setVisible={setVisible} setError={setError}>
      <>
        <h3 className={styles.title}>Update {dataUpdateUser.email}</h3>
        <form className={styles.container}>
          <p className={styles.text}>Email:</p>
          <Input
            value={email}
            id="email"
            placeholder={dataUpdateUser.email}
            autoComplete="on"
            type="email"
            onChange={setEmail}
          />

          <p className={styles.text}>Name:</p>
          <Input
            value={name}
            id="name"
            placeholder={dataUpdateUser.name}
            autoComplete="on"
            type="text"
            onChange={setName}
          />
          {error && <p className={styles.message}>{error}</p>}
          <Button onClick={(e) => updateUserFn(e)}>Update</Button>
        </form>
      </>
    </Modal>
  );
}

export default UpdateUserForm;
