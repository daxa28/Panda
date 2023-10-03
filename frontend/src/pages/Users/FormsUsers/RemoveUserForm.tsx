import { useMutation } from "@apollo/client";
import React from "react";
import { REMOVE_USER } from "../../../core/graphql/mutations/user";
import Modal from "../../../components/Modal/Modal";
import * as styles from "./form.module.scss";
import Button from "../../../components/UI/Button/Button";

type Props = {
  visible: boolean;
  refetch: () => void;
  setVisible: (visible: boolean) => void;
  idRemoveUser: number;
  emailRemoveUser: string;
};

function RemoveUserForm({
  visible,
  setVisible,
  refetch,
  idRemoveUser,
  emailRemoveUser,
}: Props) {
  const [removeUser] = useMutation(REMOVE_USER);

  function removeUserFn() {
    removeUser({
      variables: {
        id: Number(idRemoveUser),
      },
    }).then(() => {
      setVisible(false);
      refetch();
    });
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={styles.container}>
        <p className={styles.text}>
          Are you sure you want to delete {emailRemoveUser}?
        </p>
        <div className={styles.btns}>
          <Button onClick={() => removeUserFn()}>Yes</Button>
          <p />
          <Button onClick={() => setVisible(false)}>No</Button>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveUserForm;
