import React from "react";
import * as styles from "./pagination.module.scss";
import { getPageArray } from "../../utils/pages";

type Props = {
  totalPages: number;
  page: number;
  changePage: (p: number) => void;
};

const Pagination = ({ totalPages, page, changePage }: Props) => {
  const pageArray = getPageArray(totalPages);

  if (pageArray.length <= 1) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      {pageArray.map((p) => (
        <div
          onClick={() => changePage(p)}
          key={p}
          className={
            page === p ? styles.pageCurrent + " " + styles.page : styles.page
          }
        >
          {p}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
