import { useSelector } from "react-redux";

export const useValue = () => {
  const { value } = useSelector((state) => state.search);
  return {
    value
  };
};
