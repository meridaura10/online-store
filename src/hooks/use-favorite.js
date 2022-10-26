import { useSelector } from "react-redux";

export const useFavorite = () => {
  const { items, totalPrice, count, status, error } = useSelector(
    (state) => state.favorit
  );
  return {
    items,
    totalPrice,
    count,
    status,
    error,
  };
};
