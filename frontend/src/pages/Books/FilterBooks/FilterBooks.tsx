import * as styles from "./filterBooks.module.scss";
import React, { Fragment, useRef, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Select from "../../../components/UI/Select/Select";
import { getRandomString } from "../../../utils/randomValue";
import { useNavigate, useSearchParams } from "react-router-dom";

type FilterBooksProps = {
  setStartIndex: (v: number) => void;
  setErrorSearchBookInput: (v: string) => void;
};

function FilterBooks({
  setStartIndex,
  setErrorSearchBookInput,
}: FilterBooksProps) {
  const [queryParameters] = useSearchParams();

  const searchBook = queryParameters.get("_search");
  const orderBy = queryParameters.get("_orderBy");
  const category = queryParameters.get("_category");

  const [searchBookInput, setSearchBookInput] = useState(
    searchBook ? searchBook : ""
  );
  const [orderBySelect, setOrderBySelect] = useState(
    orderBy ? orderBy : "relevance"
  );
  const [categorySelect, setCategorySelect] = useState(
    category ? category : "all"
  );

  const [isClicked, setIsClicked] = useState(false);

  const router = useNavigate();

  const inputEl = useRef<HTMLInputElement>(null);

  if (isClicked) {
    getBooks();
  }

  function getBooks() {
    setIsClicked(false);
    setStartIndex(0);
    setErrorSearchBookInput("");
    if (searchBookInput !== "") {
      if (!orderBySelect && !categorySelect) {
        router({
          search: `_search=${searchBookInput}`,
        });
      } else if (orderBySelect && !categorySelect) {
        router({
          search: `_search=${searchBookInput}&_orderBy=${orderBySelect}&_category=all`,
        });
      } else {
        router({
          search: `_search=${searchBookInput}&_orderBy=${orderBySelect}&_category=${categorySelect}`,
        });
      }
    } else {
      inputEl.current && inputEl.current.focus();
      setErrorSearchBookInput("Oops... Enter search text.");
      router("/books");
    }
  }

  function getRandomBooks() {
    setStartIndex(0);
    setErrorSearchBookInput("");
    setOrderBySelect(getRandomString(["relevance", "newest"]));
    setCategorySelect(
      getRandomString([
        "",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
        "poetry",
      ])
    );
    setSearchBookInput(
      getRandomString([
        "wagon",
        "shallow",
        "collect",
        "golf",
        "elbow",
        "suffer",
      ])
    );
    setIsClicked(true);
  }

  return (
    <Fragment>
      <div className={styles.search}>
        <Input
          inputEl={inputEl}
          value={searchBookInput}
          id="book"
          placeholder="book..."
          autoComplete="on"
          type="text"
          onChange={setSearchBookInput}
          onKeyDownFn={getBooks}
        />
        <Button onClick={getBooks}>Search</Button>
      </div>

      <div className={styles.sort}>
        <Select
          options={[
            { value: "relevance", name: "relevance" },
            { value: "newest", name: "newest" },
          ]}
          defaultValue="relevance"
          value={orderBySelect}
          onChange={setOrderBySelect}
        />
        <Select
          options={[
            { value: "", name: "all" },
            { value: "art", name: "art" },
            { value: "biography", name: "biography" },
            { value: "computers", name: "computers" },
            { value: "history", name: "history" },
            { value: "medical", name: "medical" },
            { value: "poetry", name: "poetry" },
          ]}
          defaultValue="all"
          value={categorySelect}
          onChange={setCategorySelect}
        />
      </div>

      <div className={styles.random}>
        <Button onClick={getRandomBooks}>Random Search</Button>
      </div>
    </Fragment>
  );
}

export default FilterBooks;
