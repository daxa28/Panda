import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER } from "../../../core/graphql/query/user";
import User from "../User/User";
// import * as styles from "./foundUsers.module.scss";
import * as commonStyles from "../../../assets/styles/common.module.scss";
import Loader from "../../../components/Loader/Loader";
import { UserType } from "../Users";

type Props = {
  search: string;
};

function FoundUser({ search }: Props) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      search,
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className={commonStyles.message}>Oops... Failed to get users.</p>
      ) : data.getUser.length > 0 ? (
        data.getUser.map((user: UserType) => <User user={user} key={user.id} />)
      ) : (
        <p className={commonStyles.message}>Oops... Users is not found.</p>
      )}
    </>
  );
}

export default FoundUser;
