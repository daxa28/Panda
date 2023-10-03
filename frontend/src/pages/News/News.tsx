import * as styles from "./news.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  getPostsAction,
  postsSelector,
} from "../../core/redux/slices/postsSlice";
import Loader from "../../components/Loader/Loader";
import useFilter from "./hooks/useFilter";
import { useSort } from "./hooks/useSort";
import Posts from "./Posts/Posts";
import InputFountNews from "./InputFountNews/InputFountNews";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function News() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [activeSearchValue, setActiveSearchValue] = useState("");

  const selectedPosts = useAppSelector(postsSelector);

  const isLoading = selectedPosts.isLoading;
  const error = selectedPosts.error;
  const posts = selectedPosts.data;

  const dispatch = useAppDispatch();

  const router = useNavigate();

  useEffect(() => {
    dispatch(getPostsAction());
  }, []);

  const { availableItems } = useFilter(posts, activeSearchValue);
  const { sortMode, setSortMode, sortedItems } = useSort(availableItems);

  const totalPages = Math.ceil(sortedItems.length / limit);

  const [queryParameters] = useSearchParams();
  const sort = queryParameters.get("_sort");
  const search = queryParameters.get("_search");

  useEffect(() => {
    setActiveSearchValue(search ? search : "");
    setSortMode(sort ? sort : "");
  }, [sort, search]);

  function onKeyDown(value: string) {
    if (value === "") {
      if (!sortMode) {
        router("/news");
      } else
        router({
          search: `_sort=${sortMode}`,
        });
    } else {
      if (!sortMode) {
        router({
          search: `_search=${value}`,
        });
      } else {
        router({
          search: `_search=${value}&_sort=${sortMode}`,
        });
      }
    }
    setPage(1);
  }

  function inputRadioOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (activeSearchValue === "") {
      if (!e.target.value) {
        router("/news");
      } else
        router({
          search: `_sort=${e.target.value}`,
        });
    } else {
      if (!e.target.value) {
        router({
          search: `_search=${activeSearchValue}`,
        });
      } else {
        router({
          search: `_search=${activeSearchValue}&_sort=${e.target.value}`,
        });
      }
    }
    setPage(1);
  }

  return (
    <Fragment>
      <h2 className={styles.title}>News page</h2>
      <div className={styles.container}>
        <div className={styles.search}>
          <InputFountNews
            id="search"
            autoComplete="on"
            type="search"
            placeholder="search..."
            onKeyDown={onKeyDown}
          />
        </div>

        <div className={styles.sorts}>
          <div className={styles.sort}>
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sortMode === "asc"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                inputRadioOnChange(e);
              }}
            />
            <p className={styles.label}> A-Z</p>
          </div>
          <div className={styles.sort}>
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sortMode === "desc"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                inputRadioOnChange(e);
              }}
            />
            <p className={styles.label}>Z-A</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : error ? (
        <p className={commonStyles.message}>Oops... Failed to get posts.</p>
      ) : posts ? (
        <Posts
          posts={sortedItems}
          totalPages={totalPages}
          limit={limit}
          setPage={setPage}
          page={page}
        />
      ) : (
        <p className={commonStyles.message}>Oops... Posts is not found.</p>
      )}
    </Fragment>
  );
}
