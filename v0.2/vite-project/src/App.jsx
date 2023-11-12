import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Header from "./components/header";
import LandCard from "./components/landCard";
import AllKeys from "./components/allKeys";
import MyKeys from "./components/myKeys";
import SingleKey from "./components/singleKey";
import CreateUser from "./components/createUser";
import UpdateUser from "./components/updateUser";
import CreateKey from "./components/createKey";

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" exact component={LandCard} />
        <Route path="/allkeys" component={AllKeys} />
        <Route path="/mykeys" component={MyKeys} />
        <Route path="/keys/:id" component={SingleKey} />
        <Route path="/createuser" component={CreateUser} />
        <Route path="/updateuser/:id" component={UpdateUser} />
        <Route path="/createkey" component={CreateKey} />
      </Routes>
    </Router>
  );
}

export default App;
