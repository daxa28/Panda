import React from "react";
import * as styles from "./cardBook.module.scss";
import { useNavigate } from "react-router-dom";
import { BookType } from "../../../core/redux/slices/booksSlice";
const md5 = require("md5");

type CardBookProps = {
  book: BookType;
};

function CardBook({ book }: CardBookProps) {
  const router = useNavigate();

  return (
    <div onClick={() => router(`/books/${book.id}`)} className={styles.book}>
      <h3 className={styles.title}>{book.volumeInfo.title}</h3>
      <div className={styles.image}>
        {book.volumeInfo.imageLinks && (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="book-image" />
        )}
      </div>
      <div className={styles.authors}>
        {book.volumeInfo.authors && (
          book.volumeInfo.authors.map((author: string) => (
            <div key={md5(JSON.stringify(author))}>{author}</div>
          ))
        )}
      </div>
      <div className={styles.category}>
        {book.volumeInfo.categories && (book.volumeInfo.categories[0])}
      </div>
    </div>
  );
}

export default CardBook;
