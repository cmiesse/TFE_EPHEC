import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken, isAdmin } from "./Common";

// handle the admin routes
function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          isAdmin(getToken()) ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default AdminRoute;
