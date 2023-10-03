import * as styles from "./books.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import panda from "../../assets/images/panda.svg";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import {
  booksSelector,
  getBooksAction,
  getNextBooksAction,
} from "../../core/redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import Loader from "../../components/Loader/Loader";
import CardBook from "./CardBook/CardBook";
import FilterBooks from "./FilterBooks/FilterBooks";
import { useNavigate, useSearchParams } from "react-router-dom";
const md5 = require("md5");

export type UserType = {
  id: number;
  email: string;
  name: string;
  updatedAt: string;
};

export default function Books() {
  const [isBooks, setIsBooks] = useState(false);
  const [errorSearchBookInput, setErrorSearchBookInput] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const [queryParameters] = useSearchParams();
  const searchBook = queryParameters.get("_search");
  const orderBy = queryParameters.get("_orderBy");
  const category = queryParameters.get("_category");

  const router = useNavigate();

  const maxResults = 30;
  const selectedBooks = useAppSelector(booksSelector);

  const isLoading = selectedBooks.isLoading;
  const error = selectedBooks.error;
  const errorNextBook = selectedBooks.errorNextBooks;

  const isLoadingNextBooks = selectedBooks.isLoadingNextBooks;
  const books = selectedBooks.items;
  const totalBooks = selectedBooks.totalItems;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchBook !== "" && searchBook !== null) {
      dispatch(
        getBooksAction({
          startIndex,
          maxResults,
          searchBook,
          category: category !== "all" ? category : "",
          orderBy,
        })
      );
      setIsBooks(true);
    } else {
      setIsBooks(false);
      router("/books");
    }
  }, [searchBook, orderBy, category]);

  useEffect(() => {
    if (!isLoading && totalBooks) {
      if (startIndex >= maxResults) {
        dispatch(
          getNextBooksAction({
            startIndex,
            maxResults,
            searchBook,
            category,
            orderBy,
          })
        );
      }
    }
  }, [startIndex]);

  function getLastBook() {
    if (!errorNextBook) {
      setStartIndex(() => startIndex + maxResults);
    }
  }

  return (
    <Fragment>
      <h2 className={styles.title}>Search for Books</h2>
      <FilterBooks
        setStartIndex={setStartIndex}
        setErrorSearchBookInput={setErrorSearchBookInput}
      />
      <div className={styles.content}>
        {errorSearchBookInput ? (
          <p className={commonStyles.message}>{errorSearchBookInput}</p>
        ) : isBooks ? (
          isLoading ? (
            <Loader />
          ) : error ? (
            <p className={commonStyles.message}>Oops... Failed to get books.</p>
          ) : books ? (
            <Fragment>
              <p className={commonStyles.message}>
                Number of results found: {totalBooks}
              </p>
              <div className={styles.books}>
                {books.map((book) => (
                  <CardBook key={md5(JSON.stringify(book))} book={book} />
                ))}
              </div>
              <div className={styles.loadMore}>
                {isLoadingNextBooks ? (
                  <Loader />
                ) : errorNextBook ? (
                  <p className={commonStyles.message}>{errorNextBook}</p>
                ) : (
                  totalBooks > maxResults && (
                    <Button onClick={getLastBook}>Load more...</Button>
                  )
                )}
              </div>
            </Fragment>
          ) : (
            <p className={commonStyles.message}>
              Oops... No books were found for this request.
            </p>
          )
        ) : (
          <div className={styles.image}>
            <img src={panda} alt="book-image" />
          </div>
        )}
      </div>
    </Fragment>
  );
}
