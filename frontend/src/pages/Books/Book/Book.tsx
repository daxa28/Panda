import React, { useEffect } from "react";
import * as styles from "./book.module.scss";
import * as commonStyles from "../../../assets/styles/common.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import {
  bookSelector,
  getBookAction,
} from "../../../core/redux/slices/bookSlice";
import Loader from "../../../components/Loader/Loader";
const md5 = require("md5");

function Book() {
  const selectedBook = useAppSelector(bookSelector);

  const dispatch = useAppDispatch();
  const params = useParams();

  const isLoading = selectedBook.isLoading;
  const error = selectedBook.error;
  const book = selectedBook.data;

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        getBookAction({
          id: params.id,
        })
      );
    }
  }, []);

  return (
    <div className={styles.content}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={commonStyles.message}>Oops... Failed to get book.</div>
      ) : book ? (
        <>
          <h3>{book.volumeInfo.categories}</h3>
          <div className={styles.book}>
            <div className={styles.titleContent}>
              <h1 className={styles.title}>{book.volumeInfo.title}</h1>
              <div className={styles.image}>
                {book.volumeInfo.imageLinks && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="book-image"
                  />
                )}
              </div>
              <div className={styles.authors}>
                {book.volumeInfo.authors && (
                  book.volumeInfo.authors.map((author: string) => (
                    <div key={md5(JSON.stringify(author))}>{author}</div>
                  ))
                )}
              </div>
            </div>
            <div className={styles.descriptionContent}>
              <h2 className={styles.title}>Description</h2>
              {book.volumeInfo.description && (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description,
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={commonStyles.message}>
          Oops... Book information not found.
        </div>
      )}
    </div>
  );
}

export default Book;
