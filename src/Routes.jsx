import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "./Pages/Landing Page/LandingPage";
import PaymentPage from "./Pages/Landing Page/payment/PaymentPage";

const Routes = ({ setSiteTitle, setSiteContent }) => {
  const routes = [
    {
      path: "/",
      render: LandingPage,
    },
    {
      path: "/:id",
      render: PaymentPage,
    },
  ];

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          render={(props) => (
            <route.render
              {...props}
              setSiteContent={setSiteContent}
              setSiteTitle={setSiteTitle}
            />
          )}
        />
      ))}
      <Route exact render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
