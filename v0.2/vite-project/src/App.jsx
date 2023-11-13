// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AllKeys from "./pages/AllKeys";
import CreateKey from "./components/createKey";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allKeys" element={<AllKeys />} />
        <Route path="/createKey" element={<CreateKey />} />
      </Routes>
    </Router>
  );
}

export default App;
