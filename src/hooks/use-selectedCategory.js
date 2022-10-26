import { useSelector } from "react-redux";

export const useSelectedCategory = () => {
  return useSelector((state) => state.category.selectedCategory);
};
