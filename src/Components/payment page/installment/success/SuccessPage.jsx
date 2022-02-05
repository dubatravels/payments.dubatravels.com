import React from "react";
import Moment from "moment-timezone";
import accounting from "accounting";

import "./success.css";

function SuccessPage({ installmentData }) {
  return (
    <div className="installment-success-page">

      <div className="installment-success-page-hero">
        <svg xmlns="http://www.w3.org/2000/svg" className="installment-success-page-hero-icon" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" /></svg>
        <h1>Payment Processed</h1>
      </div>

      <div className="installment-success-page-info-section">

        <div className="installment-success-page-info-section-item-type2">
          <h1>{`${accounting.formatMoney(installmentData.total, "AED ")}`}</h1>
          <span className="installment-success-page-info-section-item-type2-date">{Moment(installmentData.lastUpdate).tz("Asia/Dubai").format("HH:mm:ss - DD MMM YYYY")}</span>
        </div>

        <div className="installment-success-page-info-section-item-type1">
          <span className="installment-success-page-info-section-item-type1-header">Payment Reference</span>
          <div className="installment-success-page-info-section-item-type1-reference">
            <svg xmlns="http://www.w3.org/2000/svg" className="installment-success-page-info-section-item-type1-reference-icon" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z" /></svg>
            <span>{installmentData.reference}</span>
          </div>
          <div className="installment-success-page-info-section-item-type1-reference">
            <svg xmlns="http://www.w3.org/2000/svg" className="installment-success-page-info-section-item-type1-reference-icon" viewBox="0 0 24 24"><path d="M22 2h-14c-1.104 0-2 .896-2 2v4h16v3.5c0 .276-.224.5-.5.5h-1.5v2h2c1.104 0 2-.896 2-2v-8c0-1.104-.896-2-2-2zm0 3h-14v-.5c0-.276.224-.5.5-.5h13c.276 0 .5.224.5.5v.5zm-6 5h-14c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-8c0-1.104-.896-2-2-2zm-11 10h-2v-1h2v1zm3 0h-2v-1h2v1zm.32-3.377c-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.326 1.571.857 2.123zm3.68 3.377h-2v-1h2v1zm-1-3c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm4 3h-2v-1h2v1z" /></svg>
            <span>{installmentData.spotiiRef}</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SuccessPage;
