//publicRoutes.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import CreateUser from "./createUser";
import LoginPage from "./login";
import ForgetPassword from "./forgetPassword";
import ResetPassword from "./resetPassword";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";

export const PublicRoute = () => {
  console.log('PublicRoute render');
  return (
    <Routes>
      <Route path="/registration" element={<CreateUser />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
