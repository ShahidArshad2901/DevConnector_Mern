import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute = ({
  children,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) =>
  // (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       !isAuthenticated && !loading ? (
  //         <Navigate to="/login" />
  //       ) : (
  //         <Navigate to="/dashboard" />
  //       )
  //     }
  //   />
  // );

  {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
