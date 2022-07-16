import React from "react";
import {
  Route,
  useLocation,
  Routes as Switch,
  Navigate as Redirect,
} from "react-router-dom";

import LandingPage from "./Pages/Landing Page/LandingPage";
import Invoice from "./Pages/invoice/Invoice";
import EmptyInvoice from "./Pages/emptypages/EmptyInvoice";
import EmptyPaymentPage from "./Pages/emptypages/EmptyPaymentPage";
import ProcessorPage from "./Pages/payment/processor/ProcessorPage";

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
    {
      path: "/paymentprocessor",
      render: ProcessorPage,
    },
    {
      path: "/paymentprocessor/:id",
      render: ProcessorPage,
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
              setSiteTitle={setSiteTitle}
              setSiteContent={setSiteContent}
            />
          )}
        />
      ))}
      <Route path="*" element={<Redirect replace to="/" />} />
    </Switch>
  );
}

export default Routes;
