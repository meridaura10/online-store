import React, { useEffect } from "react";
import AppRouter from "../route/AppRoutr";
import  Header from '../header/Header'
import { useDispatch } from "react-redux";
import { getFirebaseGoods } from "../../store/Slices/cartsSlice";
function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getFirebaseGoods())
  },[dispatch])
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
