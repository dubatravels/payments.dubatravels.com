import React from "react";
import {
  Route, Routes as Switch, Navigate as Redirect, useLocation,
} from "react-router-dom";

import LandingPage from "./Pages/Landing Page/LandingPage";
import PaymentPage from "./Pages/payment/PaymentPage";
import Invoice from "./Pages/invoice/Invoice";

function Routes({ setSiteTitle, setSiteContent }) {
  const routes = [
    {
      path: "/",
      render: LandingPage,
    },
    {
      path: "/:id",
      render: PaymentPage,
    },
    {
      path: "/invoice/:id",
      render: Invoice,
    },
  ];

  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={(
            <route.render
              setSiteContent={setSiteContent}
              setSiteTitle={setSiteTitle}
            />
          )}
        />
      ))}
      <Route path="*" element={<Redirect replace to="/" />} />
      {/* <Route exact render={() => <Redirect to="/" />} /> */}
    </Switch>
  );
}

export default Routes;
