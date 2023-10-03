import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { GET_ONE_USER } from "../../../core/graphql/query/user";
import User from "../User/User";
import * as commonStyles from "../../../assets/styles/common.module.scss";
// import * as styles from "./foundUserById.module.scss";
import Loader from "../../../components/Loader/Loader";

type FoundUserByIdProps = {
  idUser: number;
};

function FoundUserById({ idUser }: FoundUserByIdProps) {
  const { data, loading, error } = useQuery(GET_ONE_USER, {
    variables: {
      id: idUser,
    },
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className={commonStyles.message}>
          Oops... User with id: {idUser} is not found.
        </p>
      ) : (
          <User user={data.getOneUser} />
      )}
    </Fragment>
  );
}

export default FoundUserById;
