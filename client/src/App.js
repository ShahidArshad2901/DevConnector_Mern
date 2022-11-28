import { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/auth/Register";
import Login from "./components/layout/auth/Login";

import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      {/* <Landing /> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
