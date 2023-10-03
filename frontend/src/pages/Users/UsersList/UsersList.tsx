import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import * as styles from "./usersList.module.scss";
import * as commonStyles from "../../../assets/styles/common.module.scss";
import { GET_ALL_USERS } from "../../../core/graphql/query/user";
import Loader from "../../../components/Loader/Loader";
import { UserType } from "../Users";
import User from "../User/User";
import Button from "../../../components/UI/Button/Button";
import RemoveUserForm from "../FormsUsers/RemoveUserForm";
import UpdateUserForm from "../FormsUsers/UpdateUserForm";
import CreateUserForm from "../FormsUsers/CreateUserForm";

function UsersList() {
  const [modalCreateUser, setModalCreateUser] = useState(false);
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalRemoveUser, setModalRemoveUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState({
    id: 0,
    email: "",
    name: "",
    updatedAt: "",
  });
  const [idRemoveUser, setIdRemoveUser] = useState(0);
  const [emailRemoveUser, setEmailRemoveUser] = useState("");
  const [users, setUsers] = useState([]);

  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  function removeUserFn(id: number, email: string) {
    setIdRemoveUser(id);
    setEmailRemoveUser(email);
    setModalRemoveUser(true);
  }

  function updateUserFn(id: number, email: string, name: string) {
    setDataUpdateUser({ id, email, name, updatedAt: "" });
    setModalUpdateUser(true);
  }

  return (
    <>
      <div className={styles.add}>
        <Button onClick={() => setModalCreateUser(true)}>Add</Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className={commonStyles.message}>Oops... Failed to get users.</p>
      ) : users.length ? (
        users.map((user: UserType) => (
          <User key={user.id} user={user}>
            <div className={styles.btns}>
              <Button
                onClick={() => updateUserFn(user.id, user.email, user.name)}
              >
                Update
              </Button>
              <p/>
              <Button onClick={() => removeUserFn(user.id, user.email)}>
                Delete
              </Button>
            </div>
          </User>
        ))
      ) : (
        <p className={commonStyles.message}>Oops... Users list is empty.</p>
      )}

      <CreateUserForm
        visible={modalCreateUser}
        refetch={refetch}
        setVisible={setModalCreateUser}
      />
      <UpdateUserForm
        visible={modalUpdateUser}
        refetch={refetch}
        setVisible={setModalUpdateUser}
        dataUpdateUser={dataUpdateUser}
      />
      <RemoveUserForm
        visible={modalRemoveUser}
        refetch={refetch}
        setVisible={setModalRemoveUser}
        idRemoveUser={idRemoveUser}
        emailRemoveUser={emailRemoveUser}
      />
    </>
  );
}

export default UsersList;
