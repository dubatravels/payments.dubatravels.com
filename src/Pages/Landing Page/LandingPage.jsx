import React, { useEffect } from "react";

import "./landingpage.css";

const LandingPage = () => {
  useEffect(() => {
    window.location.replace("https://www.dubatravels.com/");
  }, []);

  const accounts = [
    {
      name: "Mohammed Farish",
      logo: "/nbd.svg",
      bankName: "Emirates NBD Bank",
      accountNumber: "1015786061301",
      swiftCode: "EBILAEAD",
      ibanNumber: "AE730260001015786061301",
      country: "United Arab Emirates",
    },
    {
      name: "Mohammed Farish",
      logo: "/adcb.svg",
      bankName: "ADCB Bank",
      accountNumber: "11990831920001",
      swiftCode: "ADCBAEAA",
      ibanNumber: "AE390030011990831920001",
      country: "United Arab Emirates",
    },
  ];

  return (
    <div className="landing-page">
      {accounts.map((item) => (
        <div key={item.bankName} className="landing-page-account-item">
          <div className="landing-page-account-item-logo-section">
            <img className="landing-page-account-item-logo" src={item.logo} alt={item.bankName} />
          </div>
          <div className="landing-page-account-item-details-section">
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">Bank Name: </span>
              <span className="landing-page-account-item-details-item-answer">{item.bankName}</span>
            </div>
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">Country: </span>
              <span className="landing-page-account-item-details-item-answer">{item.country}</span>
            </div>
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">Name: </span>
              <span className="landing-page-account-item-details-item-answer">{item.name}</span>
            </div>
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">Account Number: </span>
              <span className="landing-page-account-item-details-item-answer">{item.accountNumber}</span>
            </div>
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">IBAN: </span>
              <span className="landing-page-account-item-details-item-answer">{item.ibanNumber}</span>
            </div>
            <div className="landing-page-account-item-details-item">
              <span className="landing-page-account-item-details-item-heading">Swift Code: </span>
              <span className="landing-page-account-item-details-item-answer">{item.swiftCode}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
