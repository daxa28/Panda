import React, { ReactElement } from "react";
import * as styles from "./user.module.scss";
import { UserType } from "../Users";
import pandaImage from "../../../assets/images/panda.svg";
import { parseDate } from "../../../utils/datetime";

type Props = {
  children?: ReactElement;
  user: UserType;
};

function User({ children, user }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.image}>
            <img src={pandaImage} alt="Logo of the React" />
          </div>
          <p className={styles.id}>{user.id}</p>
        </div>
        <div>
          <div className={styles.name}>{user.name ? user.name : "-"}</div>
          <div className={styles.email}>email: {user.email}</div>
        </div>
      </div>
      <div>
        {children}
        <div className={styles.datetime}>
          {user.updatedAt && (
            <div> Last update: {parseDate(user.updatedAt)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
