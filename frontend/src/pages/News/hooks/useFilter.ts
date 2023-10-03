import { PostType } from "../../../core/redux/slices/postsSlice";

export default function useFilter(
  items: PostType[],
  activeSearchValue: string
) {
  const availableItems = activeSearchValue
    ? items.filter((item) => RegExp(activeSearchValue, "i").test(item.title))
    : items;

  return {
    availableItems,
  };
}
