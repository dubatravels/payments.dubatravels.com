import React from "react";

import "./reject page.css";

function RejectPage({ installmentData }) {
  const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase()
  + (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

  return (
    <div className="installment-reject-page">
      <div className="installment-reject-page-icon-section">
        <svg xmlns="http://www.w3.org/2000/svg" className="installment-reject-page-icon" viewBox="0 0 24 24"><path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-5.971 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
      </div>
      <h1>Something went wrong</h1>
      <div className="installment-reject-page-reason-section">
        <span>
          Unfortunately,
          {" "}
          {capitalize(installmentData.type)}
          {" "}
          has rejected your payment attempt.
          We recommend contacting
          {" "}
          {capitalize(installmentData.type)}
          {" "}
          Shopper Support at
          {" "}
          <a
            className="installment-reject-page-link"
            href={`tel:${installmentData.type === "spotii" ? "+971 4 275 3550" : "800 82229"}`}
          >
            {installmentData.type === "spotii" ? "+971 4 275 3550" : "800 82229"}
          </a>
          {" "}
          or contacting one of our travel agents for immediate assistance.
        </span>
      </div>

    </div>
  );
}

export default RejectPage;