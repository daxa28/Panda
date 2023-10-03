import { PostType } from "../../../core/redux/slices/postsSlice";

export default function usePagination(
  items: PostType[],
  limitItems: number,
  page: number
) {
  return items.slice((page - 1) * limitItems, page * limitItems);
}
