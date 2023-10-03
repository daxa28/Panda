import * as styles from "./users.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import React, { useState } from "react";
import FoundUserById from "./FoundUserById/FoundUserById";
import FoundUser from "./FoundUsers/FoundUsers";
import UsersList from "./UsersList/UsersList";
import FilterUsers from "./FilterUsers/FilterUsers";

export type UserType = {
  id: number;
  email: string;
  name: string;
  updatedAt: string;
};

export default function Users() {
  const [searchById, setSearchById] = useState(0);
  const [errorSearchById, setErrorSearchById] = useState("");
  const [searchByString, setSearchByString] = useState("");

  return (
    <div>
      <h2 className={styles.title}>Users page</h2>
      <FilterUsers
        setSearchById={setSearchById}
        setErrorSearchById={setErrorSearchById}
        setSearchByString={setSearchByString}
      />
      {errorSearchById ? (
        <div className={commonStyles.message}>{errorSearchById}</div>
      ) : searchById ? (
        <FoundUserById idUser={searchById} />
      ) : searchByString ? (
        <FoundUser search={searchByString} />
      ) : (
        <UsersList />
      )}
    </div>
  );
}
