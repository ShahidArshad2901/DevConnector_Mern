import { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/auth/Register";
import Login from "./components/layout/auth/Login";
import Alert from "./components/layout/Alert";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Landing /> */}
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
