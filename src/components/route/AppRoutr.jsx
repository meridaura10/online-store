import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/route";
import { routes } from "./route";

function AppRouter() {
  return (
    <Routes>
      <Route to="/">
        {routes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
