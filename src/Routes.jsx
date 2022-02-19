import React from "react";
import {
  Route, Routes as Switch,
  Navigate as Redirect,
  useLocation,
} from "react-router-dom";

import LandingPage from "./Pages/Landing Page/LandingPage";
import Invoice from "./Pages/invoice/Invoice";
import EmptyInvoice from "./Pages/emptypages/EmptyInvoice";
import EmptyPaymentPage from "./Pages/emptypages/EmptyPaymentPage";

function Routes({ setSiteTitle, setSiteContent }) {
  const routes = [
    {
      path: "/",
      render: LandingPage,
    },
    {
      path: "/:id",
      render: EmptyPaymentPage,
    },
    {
      path: "/invoice",
      render: Invoice,
    },
    {
      path: "/invoice/:id",
      render: EmptyInvoice,
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
    </Switch>
  );
}

export default Routes;
