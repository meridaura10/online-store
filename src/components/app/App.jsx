import React, { useEffect } from "react";
import AppRouter from "../route/AppRoutr";
import Header from "../header/Header";
import { useDispatch } from "react-redux";
import { getFirebaseGoods } from "../../store/Slices/cartsSlice";
import { getFirebaseFavorites } from "../../store/Slices/favoritesSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFirebaseGoods());
    dispatch(getFirebaseFavorites());
  }, [dispatch]);
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
