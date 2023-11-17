// privateRoute.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AllKeys from "../pages/AllKeys";
import KeyByLand from "../pages/KeyByLand";
import LoginPage from "./login";

import CreateKey from "./createKey";

export const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allKeys" element={<AllKeys />} />
      <Route path="/land/:land" element={<KeyByLand />} />
      <Route path="/createKey" element={<CreateKey />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
