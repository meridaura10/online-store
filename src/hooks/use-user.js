import { useSelector } from "react-redux";

export const useUserData = () => {
  const { id, email, img, name } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    id,
    img,
    name,
  };
};
