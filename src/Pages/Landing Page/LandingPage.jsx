import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BankAccounts from "../../Components/homepage/accounts section/BankAccounts";

import Search from "../../Components/homepage/Search";

import PaymentPage from "../payment/PaymentPage";

import "./landingpage.css";

function LandingPage({ setSiteTitle, setSiteContent }) {
  const [paymentPage, setPaymentPage] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id && navigator.userAgent !== "ReactSnap") {
      return setPaymentPage(true);
    }
    setSiteContent(null);
    return setSiteTitle(null);
  }, []);

  if (paymentPage) {
    return (
      <PaymentPage
        setSiteTitle={setSiteTitle}
        setSiteContent={setSiteContent}
        setPaymentPage={setPaymentPage}
      />
    );
  }

  return (
    <div className="landing-page">
      <a href="/invoice" className="invisible-link">test </a>
      <Search />
      <BankAccounts />
    </div>
  );
}

export default LandingPage;
