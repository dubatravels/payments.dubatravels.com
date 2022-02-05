import React from "react";

import accounts from "./accounts";

import "./bank accounts.css";
import BankAccountItem from "./BankAccountItem";

function BankAccounts() {
  return (
    <div className="homepage-bank-accounts-section">
      <h1>Bank Accounts</h1>
      <span>Our bank accounts are listed below.</span>
      <div className="homepage-bank-accounts-items-section">
        {accounts.map((item) => <BankAccountItem key={item.id} data={item} />)}
      </div>
    </div>
  );
}

export default BankAccounts;
