import axios from "axios";
import React, { useEffect, useState } from "react";

import "./paymentpage.css";

const PaymentPage = ({ match, setSiteTitle, setSiteContent }) => {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState({
    subtotal: "0",
    charges: "0",
    total: "0",
    linkValue: 1,
    invoice: "",
    date: "00/00/000",
    time: "00:00",
  });

  const fetchData = (id) => {
    axios.get(`https://dubatravels.herokuapp.com/payments/${id}`)
      .then((response) => {
        const {
          amount: resultAmount, date,
          time, invoice,
        } = response.data.paymentData;
        const value = parseFloat(resultAmount);
        const tax = value * 0.03;
        const taxOfTax = tax * 0.03;
        const totalValue = value + tax + taxOfTax;

        const formatNumber = (num) => new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2 }).format(num.toFixed(2));

        setAmount({
          subtotal: formatNumber(value),
          charges: formatNumber(tax + taxOfTax),
          total: formatNumber(totalValue),
          linkValue: totalValue,
          invoice,
          date,
          time,
        });

        setSiteContent(`Payment Summary of AED ${formatNumber(totalValue)}`);
        setSiteTitle(`Pay AED ${formatNumber(totalValue)}`);

        setLoading(false);
      })
      // eslint-disable-next-line no-return-assign
      .catch(() => window.location = "/");
  };

  useEffect(() => {
    const { id } = match.params;
    setSiteTitle("Payment Summary");

    fetchData(id);
    return () => {
      setSiteTitle(null);
    };
  }, []);

  if (loading) {
    return <div />;
  }

  return (
    <div className="payment-page">
      <div className="payment-page-heading">
        <h1>Payment Summary </h1>
        <span hidden={!amount.invoice} className="payment-page-heading-order-number">
          #
          {amount.invoice}
        </span>
      </div>
      <div className="payment-page-detail-section">
        <div className="payment-page-detail-item">
          <span className="payment-page-detail-item-title">Date:</span>
          <span>{amount.date}</span>
        </div>
        <div className="payment-page-detail-item">
          <span className="payment-page-detail-item-title">Time:</span>
          <span>{amount.time}</span>
        </div>
        <div className="payment-page-detail-item">
          <span className="payment-page-detail-item-title">Payment Method:</span>
          <span>Credit/Debit Card</span>
        </div>
      </div>
      <div className="payment-page-detail-section">
        <div className="payment-page-cost-item">
          <span className="payment-page-cost-item-title">Subtotal</span>
          <span>
            AED
            {" "}
            {amount.subtotal}
          </span>
        </div>
        <div className="payment-page-cost-item-2">
          <span className="payment-page-cost-item-title">Gateway Charges</span>
          <span>
            AED
            {" "}
            {amount.charges}
          </span>
        </div>
        <div className="payment-page-cost-item total">
          <span className="payment-page-cost-item-title">Total</span>
          <span>
            AED
            {" "}
            {amount.total}
          </span>
        </div>
      </div>
      <a href={`https://business.mamopay.com/pay/duba?a=${amount.linkValue.toFixed(2)}`} className="payment-page-pay-button">
        <span>Pay with mamopay</span>
      </a>
    </div>
  );
};
export default PaymentPage;
