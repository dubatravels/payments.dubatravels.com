/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "moment-timezone";
import { useParams } from "react-router-dom";

import "./invoice.css";

function Invoice({ setSiteTitle }) {
  const [data, setData] = useState({});
  const [existing, setExisting] = useState(null);
  // const [type, setType] = useState(0);
  const fetchInvoice = async (id) => {
    const invoiceData = await axios.get(`https://backend.dubatravels.com/payments/invoice/${id}`)
      .then((response) => response.data);
    // const moment =

    if (invoiceData) {
      const {
        items, amountPaid,
        invoiceDate, to,
      } = invoiceData;
      let total = 0;
      items.forEach((item) => {
        const { unit_cost: unitCost, quantity } = item;
        total += (unitCost * quantity);
      });

      setSiteTitle(`${to}'s Invoice`);

      setData({
        ...invoiceData,
        amountPaid: `AED ${new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2 }).format(amountPaid)}`,
        total: `AED ${new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2 }).format(total)}`,
        balance: `AED ${new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2 }).format(total - amountPaid)}`,
        invoiceDate: Moment(invoiceDate).tz("Asia/Dubai").format("DD MMM YYYY"),
        time: Moment(invoiceDate).tz("Asia/Dubai").format("LT"),
      });
      return setExisting(true);
    }

    return setExisting(false);
  };

  const params = useParams();

  useEffect(() => {
    const { id } = params;
    fetchInvoice(id);
    setSiteTitle("Invoice");
    return () => {
      setSiteTitle(null);
    };
  }, []);

  const onClickDownload = () => {
    const { id } = params;
    axios.get(`https://backend.dubatravels.com/payments/invoice/download/${id}`, {
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${data.to} - Duplicate Invoice.pdf`);
        document.body.appendChild(link);
        link.click();
        return url;
      });
  };

  const additionalData = [
    {
      name: "Invoice Issued To",
      data: data.to,
    },
    {
      name: "Invoice Issuer",
      data: data.issuer,
    },
    {
      name: "Invoice Issue Date",
      data: data.invoiceDate,
    },
    {
      name: "Invoice Issue Time",
      data: data.time,
    },
    {
      name: "Invoice Due Date",
      data: data.invoiceDate,
    },
    {
      name: "Payment Method",
      data: data.paymentMethod,
    },
    {
      name: "Payment Terms",
      data: "Upon Receipt",
    },
  ];

  if (existing) {
    return (
      <div className="invoice-page">
        <div className="invoice-page-hero">
          <span className="invoice-page-label">Amount Paid</span>
          <h1>{data.amountPaid}</h1>
        </div>
        <div className="invoice-page-items-section">
          <span className="invoice-page-items-section-header">Invoice Items</span>
          {data.items.map((item) => (
            <div key={item.name} className="invoice-page-item">
              <span className="invoice-page-item-name">{item.name}</span>
              <span className="invoice-page-item-quantity">
                x
                {item.quantity}
              </span>
              <span className="invoice-page-item-cost">
                AED
                {" "}
                {new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2 }).format(item.unit_cost)}
              </span>
            </div>
          ))}
          <div className="invoice-page-total-section">
            <span className="invoice-page-total-section-header">Invoice Total:</span>
            <span className="invoice-page-total-section-answer">{data.total}</span>
          </div>
          <div className="invoice-page-balance-section">
            <span className="invoice-page-balance-section-header">Balance:</span>
            <span className="invoice-page-balance-section-answer">{data.balance}</span>
          </div>

          <div className="invocie-additional-section">
            <span className="invocie-additional-section-header">Additional Information</span>
            {additionalData.map((item) => (
              <div className="invocie-additional-section-item">
                <span>
                  {item.name}
                  :
                </span>
                <span>{item.data}</span>
              </div>
            ))}
            <div className="invocie-signature-section">
              <span className="invocie-signature-section-header">CRYPTOGRAPHIC SIGNATURE</span>
              <span className="invocie-additional-section-item-signature">{data.hash}</span>
            </div>
            <button
              onClick={onClickDownload}
              className="invoice-download-button"
              type="button"
            >
              Download Duplicate Invoice
            </button>

            <div className="invoice-notes-section">
              <span>
                From October 1, 2021, all of our invoices will be signed and verified using
                cryptographic methods. We can thereby eliminate payment fraud and ensure
                complete financial transparency.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (existing === false) {
    return (
    //   <div>
      <div className="payment-page-loading">
        <span>This Invoice Doesn't Exist</span>
      </div>
    );
  }

  return (
    <div className="payment-page-loading">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z" /></svg>
      <span>Loading Invoice</span>
    </div>
  );
}

export default Invoice;
