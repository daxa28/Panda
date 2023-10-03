import React, { useEffect, useState } from "react";
import * as styles from "./filterUsers.module.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

type FilterUsersProps = {
  setSearchById: (id: number) => void;
  setErrorSearchById: (error: string) => void;
  setSearchByString: (search: string) => void;
};

function FilterUsers({
  setSearchById,
  setErrorSearchById,
  setSearchByString,
}: FilterUsersProps) {
  const [inputSearchById, setInputSearchById] = useState("");
  const [inputSearchByString, setInputSearchByString] = useState("");

  const router = useNavigate();

  const [queryParameters] = useSearchParams();

  const searchByIdParam = queryParameters.get("_searchId");
  const searchByStringParam = queryParameters.get("_searchString");

  useEffect(() => {
    setErrorSearchById("");
    setSearchByString("");
    setSearchById(0);
    if (searchByIdParam) {
      if (!Number(searchByIdParam)) {
        setErrorSearchById("Oops... Incorrectly entered id.");
      } else {
        setSearchById(Number(searchByIdParam));
      }
    }
    if (searchByStringParam) {
      setSearchByString(searchByStringParam);
    }
  }, [searchByIdParam, searchByStringParam]);

  function searchUserFn(param: string) {
    if (param === "byId") {
      setInputSearchByString("");
      if (inputSearchById) {
        router({
          search: `_searchId=${inputSearchById}`,
        });
      } else {
        resetSearch();
      }
    } else if (param === "byString") {
      setInputSearchById("");
      if (inputSearchByString) {
        router({
          search: `_searchString=${inputSearchByString}`,
        });
      } else {
        resetSearch();
      }
    }
  }

  function resetSearch() {
    router("/users");
    setSearchById(0);
    setErrorSearchById("");
    setSearchByString("");
  }

  return (
    <div className={styles.content}>
      <div className={styles.block}>
        <Input
          value={inputSearchById}
          id="id"
          placeholder="search by id..."
          autoComplete="on"
          type="text"
          onChange={setInputSearchById}
          onKeyDownFn={() => searchUserFn("byId")}
        />
        <Button onClick={() => searchUserFn("byId")}>Search</Button>
      </div>

      <div className={styles.block}>
        <Input
          value={inputSearchByString}
          id="searchUsers"
          placeholder="search by name and emails..."
          autoComplete="on"
          type="text"
          onChange={setInputSearchByString}
          onKeyDownFn={() => searchUserFn("byString")}
        />
        <Button onClick={() => searchUserFn("byString")}>Search</Button>
      </div>
    </div>
  );
}

export default FilterUsers;
