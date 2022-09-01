import React, { useEffect, useState } from "react";
import Moment from "moment-timezone";
import accounting from "accounting";
import axios from "axios";

import SuccessPage from "./success/SuccessPage";
import RejectPage from "./reject/RejectPage";

import "./installment.css";

function Installment({ installmentData }) {
  const [months, setMonths] = useState({
    monthTwo: "",
    monthThree: "",
    monthFour: "",
  });

  const [success, setSuccess] = useState(null);
  const [reject, setReject] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (installmentData.success || installmentData.status === "paid") {
      return setSuccess(true);
    }

    if (installmentData.reject || installmentData.status === "reject") {
      return setReject(true);
    }

    const moment = Moment().tz("Asia/Dubai");
    const monthTwo = moment.add(1, "month").format("DD MMMM");
    const monthThree = moment.add(1, "month").format("DD MMMM");
    const monthFour = moment.add(1, "month").format("DD MMMM");

    return setMonths({
      monthTwo,
      monthThree,
      monthFour,
    });
  }, []);

  const onClickPayButton = async () => {
    setDisabled(true);
    const data = await axios.post("https://backend.dubatravels.com/payments/link", { id: installmentData.reference })
    // const data = await axios.post("http://localhost:5000/payments/link", { id: installmentData.reference })
      .then((res) => res.data)
      .catch(() => null);
    if (!data) return setDisabled(false);

    window.location = data;
    return false;
  };

  if (success) {
    return <SuccessPage installmentData={installmentData} />;
  }

  if (reject) {
    return <RejectPage installmentData={installmentData} />;
  }

  const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase()
  + (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

  return (
    <div className="installments-page">

      <div className="installments-page-header-section">
        <h1>Book Now</h1>
        <h1>Pay Later</h1>
      </div>

      <div className="installments-page-Summary-header-section">
        <h1> Installment Summary</h1>
        <span className="installments-page-Summary-header-section-description">
          {installmentData.description}
        </span>
      </div>
      <div className="installments-page-info-section">
        <div className="installments-page-info-item">
          <span>Reference</span>
          <span>{installmentData.reference}</span>
        </div>
        <div className="installments-page-info-item">
          <span>Payment Terms</span>
          <span>Installment</span>
        </div>
        <div className="installments-page-info-item">
          <span>Issue Date</span>
          <span>{Moment(installmentData.issueDate).format("DD MMM YYYY")}</span>
        </div>
        <div className="installments-page-info-item">
          <span>Issue Time</span>
          <span>{Moment(installmentData.issueDate).format("hh:mm A")}</span>
        </div>
        <div className="installments-page-info-item">
          <span>Issued By</span>
          <span>{installmentData.issuedBy}</span>
        </div>
      </div>

      <div className="installments-page-amount-section">
        <div className="installments-page-amount-item">
          <span>Subtotal</span>
          <span>
            {accounting.formatMoney(installmentData.amount, "AED ")}
          </span>
        </div>
        <div className="installments-page-amount-item">
          <span>Processing Fee</span>
          <span>
            {accounting.formatMoney(installmentData.fees, "AED ")}
          </span>
        </div>
        <div className="installments-page-amount-item installments-page-amount-item-black">
          <span>Total</span>
          <span>
            {accounting.formatMoney(installmentData.total, "AED ")}
          </span>
        </div>
      </div>

      <div className="installments-page-installments-section">
        <div className="installments-page-installments-section-header">
          <span>TOTAL Payments</span>
        </div>
        <div className="installments-page-installments-section-item installments-page-installments-section-item-today">
          <span>Today</span>
          <span>{accounting.formatMoney(installmentData.installment, "AED ")}</span>
        </div>
        <div className="installments-page-installments-section-item">
          <span>{months.monthTwo}</span>
          <span>{accounting.formatMoney(installmentData.installment, "AED ")}</span>
        </div>
        <div className="installments-page-installments-section-item">
          <span>{months.monthThree}</span>
          <span>{accounting.formatMoney(installmentData.installment, "AED ")}</span>
        </div>
        <div className="installments-page-installments-section-item">
          <span>{months.monthFour}</span>
          <span>{accounting.formatMoney(installmentData.installment, "AED ")}</span>
        </div>
      </div>

      <button type="button" disabled={disabled} className="installments-page-button" onClick={onClickPayButton}>
        <span>{`PAY ${accounting.formatMoney(installmentData.installment, "AED ")} TODAY`}</span>
      </button>

      <div className="payment-page-pay-secured-message-section">
        <svg xmlns="http://www.w3.org/2000/svg" className="payment-page-pay-secured-message-section-icon" viewBox="0 0 24 24"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z" /></svg>
        <span>
          Pay Securely with
          {" "}
          {capitalize(installmentData.type)}
        </span>
      </div>

      <div className="payment-page-icons-section">
        <svg className="payment-page-icons-item" viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
          <path d="m286.87 176.71c-.228 17.993 16.036 28.034 28.287 34.004 12.588 6.126 16.816 10.054 16.768 15.531-.096 8.384-10.042 12.083-19.35 12.227-16.24.252-25.681-4.384-33.188-7.891l-5.849 27.373c7.531 3.472 21.476 6.499 35.938 6.631 33.944 0 56.152-16.756 56.273-42.736.132-32.971-45.607-34.797-45.295-49.535.108-4.468 4.372-9.237 13.717-10.45 4.624-.612 17.392-1.081 31.866 5.585l5.681-26.484c-7.783-2.835-17.789-5.55-30.244-5.55-31.95 0-54.423 16.984-54.604 41.295m139.44-39.013c-6.198 0-11.423 3.616-13.753 9.165l-48.49 115.777h33.92l6.75-18.654h41.451l3.916 18.654h29.896l-26.089-124.942zm4.744 33.752 9.789 46.916h-26.809zm-185.31-33.752-26.737 124.942h32.322l26.725-124.942zm-47.817 0-33.644 85.04-13.609-72.308c-1.597-8.071-7.903-12.732-14.906-12.732h-54.999l-.769 3.628c11.291 2.45 24.119 6.402 31.89 10.63 4.756 2.582 6.114 4.84 7.675 10.978l25.776 99.706h34.161l52.369-124.942z" fill="#1a1f71" />
        </svg>
        <svg className="payment-page-icons-item" viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="a"><path clipRule="evenodd" d="m125.758 80h308.483v240h-308.483z" /></clipPath>
          <g clipPath="url(#a)">
            <path d="m428.163 316.746v.616h.575c.108.002.215-.025.309-.078.076-.054.12-.143.115-.236.004-.092-.039-.179-.115-.23-.093-.056-.2-.083-.309-.079h-.575zm.581-.437c.247-.015.491.056.691.201.163.133.253.336.243.546.007.18-.064.355-.195.479-.154.134-.348.215-.552.23l.771.879h-.594l-.709-.873h-.23v.873h-.497v-2.333h1.08zm-.154 3.14c.261.003.519-.05.758-.154.23-.099.439-.241.617-.418.177-.177.319-.386.418-.617.202-.489.202-1.038 0-1.527-.1-.23-.242-.439-.418-.617-.178-.177-.387-.319-.617-.418-.241-.098-.498-.148-.758-.145-.264-.002-.526.047-.771.145-.235.097-.45.239-.631.418-.557.571-.719 1.424-.412 2.16.094.231.234.441.412.617.182.178.396.32.631.418.244.104.506.156.771.154m0-4.473c.678-.001 1.329.265 1.813.74.233.228.418.5.546.801.266.622.266 1.328 0 1.951-.131.298-.316.57-.546.8-.237.227-.512.41-.813.54-.316.134-.656.203-1 .201-.347.002-.691-.066-1.012-.201-.304-.127-.582-.31-.819-.54-.23-.238-.413-.519-.538-.826-.266-.623-.266-1.329 0-1.952.127-.3.313-.572.546-.8.234-.234.512-.417.819-.54.32-.135.665-.203 1.012-.2m-236.183-8.987c0-4.449 2.916-8.105 7.68-8.105 4.553 0 7.626 3.498 7.626 8.105 0 4.608-3.073 8.106-7.626 8.106-4.764 0-7.68-3.656-7.68-8.106m20.496 0v-12.663h-5.505v3.085c-1.746-2.28-4.394-3.709-7.996-3.709-7.095 0-12.663 5.565-12.663 13.294s5.565 13.294 12.663 13.294c3.6 0 6.25-1.432 7.996-3.71v3.074h5.499v-12.665zm186.003 0c0-4.449 2.915-8.105 7.681-8.105 4.558 0 7.626 3.498 7.626 8.105 0 4.608-3.068 8.106-7.626 8.106-4.764 0-7.681-3.656-7.681-8.106m20.502 0v-22.827h-5.51v13.249c-1.746-2.28-4.394-3.709-7.995-3.709-7.096 0-12.664 5.565-12.664 13.294s5.565 13.294 12.664 13.294c3.601 0 6.249-1.432 7.995-3.71v3.074h5.51zm-138.182-8.366c3.547 0 5.826 2.225 6.407 6.141h-13.135c.588-3.656 2.807-6.141 6.729-6.141m.11-4.935c-7.419 0-12.609 5.398-12.609 13.294 0 8.05 5.398 13.294 12.978 13.294 3.812 0 7.305-.952 10.377-3.548l-2.698-4.079c-2.122 1.696-4.824 2.648-7.365 2.648-3.547 0-6.777-1.643-7.571-6.201h18.797c.054-.684.109-1.375.109-2.116-.055-7.892-4.935-13.294-12.021-13.294m66.463 13.294c0-4.45 2.915-8.105 7.679-8.105 4.554 0 7.626 3.498 7.626 8.105s-3.072 8.106-7.626 8.106c-4.764 0-7.681-3.656-7.681-8.106m20.496 0v-12.654h-5.502v3.085c-1.752-2.28-4.394-3.709-7.996-3.709-7.095 0-12.663 5.565-12.663 13.294s5.565 13.294 12.663 13.294c3.602 0 6.244-1.432 7.996-3.71v3.074h5.503v-12.665zm-51.582 0c0 7.68 5.346 13.294 13.506 13.294 3.812 0 6.353-.848 9.1-3.018l-2.644-4.45c-2.067 1.485-4.237 2.28-6.632 2.28-4.395-.054-7.626-3.232-7.626-8.106s3.231-8.05 7.626-8.105c2.389 0 4.559.794 6.632 2.279l2.644-4.449c-2.752-2.171-5.292-3.019-9.1-3.019-8.16 0-13.506 5.613-13.506 13.294m70.967-13.294c-3.176 0-5.244 1.485-6.674 3.71v-3.07h-5.456v25.314h5.511v-14.19c0-4.189 1.8-6.517 5.399-6.517 1.178-.017 2.348.2 3.442.637l1.697-5.188c-1.218-.48-2.807-.691-3.922-.691m-147.554 2.648c-2.648-1.746-6.298-2.648-10.323-2.648-6.414 0-10.543 3.074-10.543 8.104 0 4.127 3.074 6.674 8.735 7.468l2.6.37c3.019.424 4.444 1.219 4.444 2.648 0 1.958-2.005 3.075-5.77 3.075-3.813 0-6.565-1.219-8.42-2.649l-2.587 4.293c3.019 2.224 6.832 3.285 10.961 3.285 7.311 0 11.548-3.443 11.548-8.263 0-4.45-3.335-6.777-8.844-7.571l-2.595-.377c-2.383-.308-4.292-.788-4.292-2.485 0-1.85 1.8-2.964 4.82-2.964 3.231 0 6.359 1.218 7.892 2.17l2.383-4.45zm71.03-2.644c-3.176 0-5.244 1.486-6.668 3.71v-3.079h-5.456v25.314h5.505v-14.19c0-4.189 1.8-6.517 5.399-6.517 1.178-.017 2.348.2 3.442.637l1.697-5.188c-1.218-.48-2.807-.691-3.922-.691m-46.973.635h-9.002v-7.679h-5.565v7.679h-5.134v5.032h5.134v11.548c0 5.873 2.28 9.371 8.792 9.371 2.389 0 5.141-.74 6.887-1.957l-1.59-4.714c-1.643.952-3.443 1.432-4.874 1.432-2.752 0-3.65-1.697-3.65-4.237v-11.439h9.002zm-82.302 25.321v-15.887c0-5.983-3.813-10.009-9.959-10.063-3.232-.054-6.565.952-8.898 4.504-1.746-2.807-4.498-4.504-8.366-4.504-2.704 0-5.346.794-7.415 3.759v-3.13h-5.509v25.314h5.552v-14.036c0-4.394 2.437-6.729 6.201-6.729 3.655 0 5.505 2.383 5.505 6.674v14.088h5.565v-14.036c0-4.394 2.54-6.729 6.194-6.729 3.759 0 5.553 2.383 5.553 6.674v14.088z" fill="#231f20" />
            <path d="m431.302 234.43v-3.702h-.964l-1.115 2.54-1.109-2.54h-.967v3.702h.684v-2.789l1.043 2.406h.71l1.042-2.412v2.795h.679zm-6.116 0v-3.068h1.234v-.625h-3.153v.625h1.234v3.068z" fill="#f79410" />
            <path d="m321.733 250.306h-83.423v-149.923h83.425z" fill="#ff5f00" />
            <path d="m243.599 175.348c0-30.412 14.24-57.503 36.413-74.962-16.781-13.232-37.548-20.418-58.918-20.386-52.654 0-95.336 42.688-95.336 95.348 0 52.659 42.682 95.347 95.336 95.347 21.37.032 42.138-7.154 58.92-20.386-22.172-17.456-36.415-44.548-36.415-74.961" fill="#eb001b" />
            <path d="m434.28 175.348c0 52.659-42.682 95.347-95.335 95.347-21.373.031-42.143-7.154-58.928-20.386 22.18-17.459 36.42-44.548 36.42-74.961 0-30.414-14.24-57.503-36.42-74.962 16.784-13.232 37.554-20.417 58.926-20.386 52.654 0 95.336 42.688 95.336 95.348" fill="#f79410" />
          </g>
        </svg>
      </div>

    </div>
  );
}

export default Installment;
