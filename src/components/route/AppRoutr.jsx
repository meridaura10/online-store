import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/route";
import { useUserData } from "../../hooks/use-user";
import { PrivatRoutes, routes } from "./route";

function AppRouter() {
  const userAuth = useUserData().isAuth
  return (
    <Routes>
      <Route to="/">
        {routes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
        {userAuth && PrivatRoutes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
