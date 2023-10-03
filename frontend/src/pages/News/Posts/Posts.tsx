import React, { Fragment } from "react";
// import * as styles from "./posts.module.scss";
import * as commonStyles from "../../../assets/styles/common.module.scss";
import { PostType } from "../../../core/redux/slices/postsSlice";
import Post from "../Post/Post";
import Pagination from "../../../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";

type Props = {
  posts: PostType[];
  totalPages: number;
  limit: number;
  setPage: (v: number) => void;
  page: number;
};

function Posts({ posts, totalPages, limit, setPage, page }: Props) {
  const items = usePagination(posts, limit, page);
  return (
    <Fragment>
      {items.length > 0 ? (
        <>
          {items.map((post: PostType) => (
            <Post key={post.id} post={post} />
          ))}
          <Pagination
            totalPages={totalPages}
            changePage={setPage}
            page={page}
          />
        </>
      ) : (
        <p className={commonStyles.message}>Oops... Posts is not found!</p>
      )}
    </Fragment>
  );
}

export default Posts;
