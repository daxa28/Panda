import { useState } from "react";
import { PostType } from "../../../core/redux/slices/postsSlice";

export function useSort(items: PostType[]) {
  const [sortMode, setSortMode] = useState("");

  const sortedItems = !sortMode
    ? items
    : items.slice().sort((a, b) => {
        if (sortMode === "asc" && a.title > b.title) {
          return 1;
        } else if (sortMode === "asc") {
          return -1;
        } else if (sortMode === "desc" && a.title > b.title) {
          return -1;
        } else {
          return 1;
        }
      });

  return {
    sortMode,
    setSortMode,
    sortedItems,
  };
}
