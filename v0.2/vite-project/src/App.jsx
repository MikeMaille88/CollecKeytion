// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import { PrivateRoute } from "./components/privateRoute";
import { PublicRoute } from "./components/publicRoute";

function App() {
  const isAuthenticated = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null;
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {isAuthenticated() ? (
            <Route path="/*" element={<PrivateRoute />} />
          ) : (
            <Route path="/*" element={<PublicRoute />} />
          )}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
