import React from "react";
import Chance from "chance";

import "./bank accounts.css";

import accounts from "./accounts";
import BankAccountItem from "./BankAccountItem";

const chanceObj = new Chance();

function BankAccounts() {
  return (
    <div className="homepage-bank-accounts-section">
      <h1>Bank Accounts</h1>
      <span>Our bank accounts are listed below.</span>
      <div className="homepage-bank-accounts-items-section">
        {accounts.map((item) => <BankAccountItem key={chanceObj.guid()} data={item} />)}
      </div>
    </div>
  );
}

export default BankAccounts;
