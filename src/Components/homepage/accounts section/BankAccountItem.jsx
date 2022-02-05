import React from "react";

import "./bank account item.css";

function BankAccountItem({ data }) {
  return (
    <div hidden={data.hidden} className={data.hidden ? null : "homepage-bank-account-item"}>
      <img className="homepage-bank-account-item-logo" src={data.logo} alt={data.bankName} />
      <div className="homepage-bank-account-item-info-section">
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Bank:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.bankName}</span>
        </div>
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Name:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.name}</span>
        </div>
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Account Number:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.accountNumber}</span>
        </div>
        {data.country === "United Arab Emirates" ? (
          <div className="homepage-bank-account-item-info-section-item">
            <span className="homepage-bank-account-item-info-section-item-type">IBAN:</span>
            <span className="homepage-bank-account-item-info-section-item-data">{data.ibanNumber}</span>
          </div>
        ) : (
          <div hidden />
        )}
        {data.country === "India" ? (
          <div className="homepage-bank-account-item-info-section-item">
            <span className="homepage-bank-account-item-info-section-item-type">IFSC:</span>
            <span className="homepage-bank-account-item-info-section-item-data">{data.ifsc}</span>
          </div>
        ) : (
          <div hidden />
        )}
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Branch:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.branch}</span>
        </div>
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Country:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.country}</span>
        </div>
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">Currency:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.currency}</span>
        </div>
        <div className="homepage-bank-account-item-info-section-item">
          <span className="homepage-bank-account-item-info-section-item-type">SWIFT Code:</span>
          <span className="homepage-bank-account-item-info-section-item-data">{data.swiftCode}</span>
        </div>
      </div>
    </div>
  );
}

export default BankAccountItem;
