import React from "react";
import * as styles from "./post.module.scss";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        {post.id}. {post.title}
      </div>
      <p>{post.body}</p>
    </div>
  );
}

export default Post;
