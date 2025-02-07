// privateRoute.jsx

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AllKeys from "../pages/AllKeys";
import KeyByLand from "../pages/KeyByLand";
import LoginPage from "./login";
import KeyPage from "../pages/KeyPage";
import MyKeys from "../pages/MyKeys";
import Profile from "../pages/Profile";
import AdminPage from "../pages/Admin";
import { AuthProvider } from "./authContext";
import ImageGallery from "./testImportAvatars";

import CreateKey from "./createKey";

export const PrivateRoute = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allKeys" element={<AllKeys />} />
        <Route path="/land/:land" element={<KeyByLand />} />
        <Route path="/createKey" element={<CreateKey />} />
        <Route path="/keys/:keyId" element={<KeyPage />} />
        <Route path="/mykeys" element={<MyKeys />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminpage/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/avatar" element={<ImageGallery />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};
