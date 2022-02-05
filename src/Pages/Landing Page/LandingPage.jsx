import React from "react";

import BankAccounts from "../../Components/homepage/accounts section/BankAccounts";

import Search from "../../Components/homepage/Search";

import "./landingpage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Search />
      <BankAccounts />
    </div>
  );
}

export default LandingPage;
