import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CreateUser from "./createUser";
import LoginPage from "./login";

export const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/registration" element={<CreateUser />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
