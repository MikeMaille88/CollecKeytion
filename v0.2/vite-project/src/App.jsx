// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AllKeys from "./pages/AllKeys";
import CreateKey from "./components/createKey";
import CreateUser from "./components/createUser";
import KeyByLand from "./pages/KeyByLand";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allKeys" element={<AllKeys />} />
          <Route path="/createKey" element={<CreateKey />} />
          <Route path="/registration" element={<CreateUser />} />
          <Route path="/land/:land" element={<KeyByLand />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
