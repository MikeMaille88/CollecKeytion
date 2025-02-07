//publicRoutes.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import CreateUser from "./createUser";
import LoginPage from "./login";
import ForgetPassword from "./forgetPassword";
import ResetPassword from "./resetPassword";

export const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/registration" element={<CreateUser />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
    </Routes>
  );
};
