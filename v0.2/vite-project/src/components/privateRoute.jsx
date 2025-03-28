// privateRoute.jsx

// import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import AllKeys from "../pages/AllKeys";
// import KeyByLand from "../pages/KeyByLand";
// import LoginPage from "./login";
// import KeyPage from "../pages/KeyPage";
// import MyKeys from "../pages/MyKeys";
// import Profile from "../pages/Profile";
// import AdminPage from "../pages/Admin";
// import { AuthProvider } from "./authContext";
// import ImageGallery from "./testImportAvatars";

// import CreateKey from "./createKey";

// export const PrivateRoute = () => {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/allKeys" element={<AllKeys />} />
//         <Route path="/land/:land" element={<KeyByLand />} />
//         <Route path="/createKey" element={<CreateKey />} />
//         <Route path="/keys/:keyId" element={<KeyPage />} />
//         <Route path="/mykeys" element={<MyKeys />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/adminpage/*" element={<AdminPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/avatar" element={<ImageGallery />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </AuthProvider>
//   );
// };


import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./authContext"; // Assure-toi que ce hook existe et fournit user
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
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";

// Composant pour protéger la route admin
const AdminRoute = ({ element }) => {
  const { user } = useAuth(); // Récupérer l'utilisateur depuis le contexte

  if (!user || !user.admin) {
    return <Navigate to="/" replace />; // Redirection si l'utilisateur n'est pas admin
  }

  return element;
};

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
        <Route path="/adminpage/*" element={<AdminRoute element={<AdminPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/avatar" element={<ImageGallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};
