// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { PrivateRoute } from "./components/privateRoute";
import { PublicRoute } from "./components/publicRoute";
import { AuthProvider } from "./components/authContext";

function App() {
  const isAuthenticated = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen">
          {/* Navbar fixe en haut */}
          <Navbar />
          
          {/* Contenu principal qui prend l'espace restant */}
          <div className="pt-16 pb-10"> 
            <Routes>
              {isAuthenticated() ? (
                <Route path="/*" element={<PrivateRoute />} />
              ) : (
                <Route path="/*" element={<PublicRoute />} />
              )}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>

          {/* Footer fixe en bas */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
