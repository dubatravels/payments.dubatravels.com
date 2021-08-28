import axios from "axios";
import React, { useEffect, useState } from "react";

import "./paymentpage.css";

const PaymentPage = ({ match, setSiteTitle, setSiteContent }) => {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState({
    subtotal: "000.00",
    charges: "00.00",
    total: "000.00",
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
    return (
      <div className="payment-page-loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z" /></svg>
      </div>
    );
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
          <span className="payment-page-cost-item-title">Bank Charges</span>
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
        <span>Pay Now</span>
      </a>
      <div className="payment-page-pay-secured-message-section">
        <svg xmlns="http://www.w3.org/2000/svg" className="payment-page-pay-secured-message-section-icon" viewBox="0 0 24 24"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z" /></svg>
        <span>Pay Securely with Mamo Pay</span>
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
        <svg className="payment-page-icons-item" viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
          <path d="m0 0h560v400h-560z" fill="none" />
          <path d="m170 90h220v220h-220z" fill="#fff" />
          <path d="m179.683 292.815h-.629c0-.314-.157-.787-.157-.945 0-.157 0-.47-.473-.47h-.945v1.415h-.472v-3.305h1.417c.63 0 1.102.158 1.102.786 0 .472-.158.631-.314.786.157.159.314.316.314.631v.629c0 .159 0 .159.157.159zm-.629-2.36c0-.473-.315-.473-.472-.473h-1.103v.945h.945c.315 0 .63-.159.63-.472zm2.677.628c0-1.887-1.574-3.464-3.622-3.464-1.889 0-3.464 1.577-3.464 3.464 0 2.047 1.575 3.623 3.464 3.623 2.047-.001 3.622-1.576 3.622-3.623zm-.473 0c0 1.733-1.416 2.992-3.149 2.992-1.732 0-2.991-1.26-2.991-2.992 0-1.573 1.26-2.991 2.991-2.991 1.732 0 3.149 1.418 3.149 2.991zm193.975-63.608c0 4.724-2.991 6.926-8.345 6.926h-10.232v-4.724h10.232c.945 0 1.732-.156 2.049-.47.313-.316.628-.789.628-1.418 0-.631-.313-1.26-.628-1.574-.317-.316-.945-.472-1.89-.472-4.88-.159-11.021.156-11.021-6.771 0-3.15 2.046-6.614 7.557-6.614h10.548v4.724h-9.762c-.943 0-1.574 0-2.046.314-.473.473-.787.945-.787 1.733 0 .787.473 1.26 1.102 1.576.631.156 1.261.314 2.048.314h2.833c2.991 0 4.882.629 6.142 1.732.942 1.102 1.572 2.521 1.572 4.724zm-22.2-4.724c-1.26-1.103-3.15-1.732-6.141-1.732h-2.833c-.787 0-1.418-.159-2.047-.314-.631-.316-1.101-.789-1.101-1.576 0-.788.156-1.26.786-1.733.473-.314 1.102-.314 2.047-.314h9.762v-4.724h-10.549c-5.669 0-7.559 3.464-7.559 6.614 0 6.926 6.142 6.612 11.023 6.771.943 0 1.574.156 1.888.472.314.314.631.943.631 1.574 0 .629-.316 1.102-.631 1.418-.472.314-1.101.47-2.046.47h-10.235v4.724h10.235c5.351 0 8.344-2.203 8.344-6.926 0-2.203-.629-3.622-1.574-4.724zm-20.154 7.086h-12.436v-4.409h12.123v-4.407h-12.123v-4.095h12.436v-4.565h-17.632v22.041h17.632zm-23.301-16.374c-1.733-.945-3.779-1.103-6.456-1.103h-12.122v22.041h5.352v-8.029h5.669c1.888 0 2.991.158 3.779.945.945 1.101.945 2.991.945 4.409v2.675h5.194v-4.251c0-2.047-.156-2.992-.786-4.093-.473-.631-1.415-1.418-2.675-1.89 1.415-.471 3.779-2.361 3.779-5.826-.002-2.517-.947-3.935-2.679-4.878zm-29.915-1.103h-16.847l-6.77 7.243-6.456-7.243h-21.255v22.041h20.941l6.771-7.243 6.455 7.243h10.235v-7.398h6.612c4.566 0 9.133-1.26 9.133-7.4-.001-5.983-4.725-7.243-8.819-7.243zm25.663 9.133c-.786.313-1.574.313-2.519.313l-6.455.159v-5.04h6.455c.945 0 1.89 0 2.519.472.631.317 1.102.945 1.102 1.89 0 .946-.471 1.733-1.102 2.206zm-25.663 1.101h-6.928v-5.669h6.928c1.89 0 3.149.789 3.149 2.678 0 1.89-1.26 2.991-3.149 2.991zm-20.311.786 8.187-8.658v17.791zm-12.753 6.457h-13.069v-4.409h11.651v-4.407h-11.651v-4.095h13.226l5.826 6.455zm113.991-33.38h-7.557l-9.919-16.532v16.532h-10.705l-2.049-4.881h-11.02l-2.047 4.881h-6.141c-2.519 0-5.826-.63-7.713-2.52-1.733-1.889-2.678-4.408-2.678-8.344 0-3.307.472-6.298 2.833-8.659 1.574-1.733 4.409-2.519 8.029-2.519h5.038v4.724h-5.038c-1.888 0-2.991.315-4.093 1.26-.945.945-1.417 2.676-1.417 5.038 0 2.361.472 4.093 1.417 5.196.787.786 2.205 1.101 3.621 1.101h2.362l7.557-17.318h7.873l8.817 20.782v-20.783h8.188l9.289 15.272v-15.272h5.352v22.042zm-62.505-22.042h-5.352v22.042h5.352zm-11.18.945c-1.732-.945-3.62-.945-6.297-.945h-12.124v22.042h5.195v-8.03h5.668c1.89 0 3.15.157 3.937.945.945 1.102.786 2.992.786 4.251v2.834h5.352v-4.409c0-1.889-.157-2.834-.943-3.936-.473-.63-1.418-1.418-2.519-1.889 1.415-.63 3.779-2.362 3.779-5.826.001-2.518-1.102-3.936-2.834-5.037zm-22.2 16.532h-12.281v-4.409h12.123v-4.565h-12.123v-3.937h12.281v-4.565h-17.634v22.042h17.634zm-21.57-17.477h-8.66l-6.455 14.957-6.928-14.957h-8.502v20.782l-8.974-20.782h-7.872l-9.447 22.042h5.668l2.046-4.881h11.021l2.047 4.881h10.707v-17.318l7.714 17.318h4.565l7.716-17.318v17.318h5.353v-22.042zm85.338 12.438-3.623-8.659-3.62 8.659zm-45.661-3.463c-.786.473-1.574.473-2.676.473h-6.457v-4.881h6.456c.945 0 2.045 0 2.676.315.629.473.945 1.103.945 2.047s-.315 1.73-.944 2.046zm-86.912 3.463 3.622-8.659 3.621 8.659zm178.074-81.558h-187.835v79.354l6.455-14.642h13.697l1.89 3.621v-3.621h16.06l3.621 7.872 3.464-7.872h51.171c2.361 0 4.407.472 5.983 1.731v-1.731h14.012v1.731c2.361-1.26 5.352-1.731 8.817-1.731h20.31l1.89 3.621v-3.621h14.958l2.205 3.621v-3.621h14.641v30.859h-14.799l-2.833-4.723v4.723h-18.422l-2.046-5.038h-4.568l-2.046 5.038h-9.604c-3.779 0-6.614-.945-8.501-1.889v1.889h-22.831v-7.085c0-.945-.157-1.103-.787-1.103h-.787v8.187h-44.086v-3.936l-1.574 3.936h-9.289l-1.574-3.779v3.779h-17.793l-1.889-5.038h-4.566l-2.046 5.038h-9.133v93.052h187.835v-56.524c-2.046.945-4.881 1.417-7.715 1.417h-13.698v-1.89c-1.574 1.261-4.409 1.89-7.085 1.89h-43.141v-7.084c0-.945-.156-.945-.945-.945h-.787v8.029h-14.17v-8.344c-2.361 1.101-5.038 1.101-7.4 1.101h-1.575v7.243h-17.318l-4.093-4.724-4.566 4.724h-27.87v-30.858h28.341l4.094 4.721 4.409-4.721h19.051c2.203 0 5.825.314 7.399 1.887v-1.887h17.004c1.732 0 5.04.314 7.243 1.887v-1.887h25.664v1.889c1.417-1.26 4.095-1.888 6.455-1.888h14.328v1.888c1.576-1.102 3.778-1.888 6.614-1.888h9.761z" fill="#006fcf" />
        </svg>
      </div>
    </div>
  );
};
export default PaymentPage;
