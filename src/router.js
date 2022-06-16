import React from "react";
import { Router } from "react-router";
import {
  /* BrowserRouter as Router, */
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import asyncComponent from "helpers/asyncComponent";
import App from "containers/App/App";
import { InitialLoader } from "containers/Pages/InitialLoader";
import { useSelector } from "react-redux";
import publicRoutes from "routes/publicRoutes";
import { getLocalDataType } from "redux/helper";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            <Component {...props} {...rest} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const PreventedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let { from } = props.location.state || {
          from: {
            pathname: isLoggedIn
              ? ["admin", "vendor"].includes(getLocalDataType())
                ? `/${getLocalDataType()}`
                : "/"
              : "/user",
          },
        };
        return isLoggedIn ? <Redirect to={from} /> : <Component {...props} />;
      }}
    />
  );
};

const PublicRoutes = ({ history }) => {
  const { isLoggedIn, validatingAuthToken, isurl } = useSelector(
    (state) => state.Auth
  );
  if (validatingAuthToken) {
    return <InitialLoader />;
  }
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          path={
            isLoggedIn
              ? ["/", "/listing", "/detail"].includes(history.location.pathname)
                ? "/"
                : isurl
              : "/user"
          }
          component={App}
          isLoggedIn={isLoggedIn}
          isuser={isurl === "/"}
        />
        {publicRoutes.map((routes) => (
          <PreventedRoute
            exact
            key={routes.path}
            path={routes.path}
            component={routes.component}
            isLoggedIn={isLoggedIn}
            isuser={!isLoggedIn}
          />
        ))}
        <Route
          exact
          path="*"
          component={asyncComponent(() =>
            import("./containers/Pages/NotFound")
          )}
        />
      </Switch>
    </Router>
  );
};

export default PublicRoutes;
