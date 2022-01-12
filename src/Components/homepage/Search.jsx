import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./search.css";

const search = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  const router = useNavigate();

  const onChangeInvoiceNumber = (e) => {
    if (e.target.value.length > 6) return;
    setInvoiceNumber(e.target.value.toUpperCase());
  };

  const onSubmitSearchQuery = (e) => {
    e.preventDefault();
    setDisableForm(true);

    axios.get(`https://backend.dubatravels.com/payments/invoice/search/${invoiceNumber}`)
      .then((response) => {
        if (response.data) return router(`/invoice/${invoiceNumber}`);
        return setDisableForm(false);
      })
      .catch(() => setDisableForm(false));
  };

  return (
    <div className="homepage-search-section">
      <svg className="homepage-search-section-logo" viewBox="0.000000 -0.000000 655.858704 285.591675">
        <path fill="#336699" d="M539.732148 232.739194 C520.106926 245.280028 493.966366 243.460757 472.708216 233.946929 C451.450066 224.433102 433.999939 208.264759 416.968644 192.379016 C436.486231 195.161085 456.701697 192.896000 475.119575 185.863371 C515.299716 170.521104 543.629163 134.670397 567.784085 99.084323 C591.939006 63.498249 615.079874 25.447658 650.714240 1.364036 C652.272207 0.311078 654.489527 -0.676910 655.858706 0.612015 C639.784409 15.861996 632.516150 37.928139 625.486089 58.940588 C618.559281 79.644420 611.303661 100.238241 603.722888 120.711668 C593.082477 149.448274 581.707576 178.136361 565.457873 204.116316 C558.597621 215.084457 550.633389 225.773124 539.732147 232.739194 z" />
        <path fill="#00135f" d="M375.107447 257.325750 C327.012701 239.494102 288.692789 202.745487 252.883042 166.020368 C237.370419 150.111210 222.043445 134.021031 206.906292 117.754212 C190.663672 100.299426 174.487539 82.504937 155.125164 68.591249 C141.019815 58.455229 125.441412 50.544124 109.591351 43.439523 C86.995971 33.311414 63.704319 24.737018 39.935327 17.796930 C85.987031 18.549882 132.792077 19.419371 176.733555 33.220566 C248.551807 55.777325 305.067629 110.111331 360.896058 160.607425 C416.724487 211.103518 478.766579 261.354354 553.248449 272.268564 C518.143487 281.395211 481.089605 277.775174 445.158388 272.815120 C421.419868 269.538183 397.576454 265.656378 375.107447 257.325750 z" />
        <path fill="#86bbd8" d="M310.165153 270.260697 C285.703135 267.613107 261.549675 262.125492 238.345099 253.943333 C222.066876 248.203470 206.240845 241.139544 189.653847 236.364814 C164.607150 229.154876 138.029319 227.313446 112.227638 231.000384 C120.622132 224.509462 130.716244 220.236760 141.219794 218.728402 C157.250770 216.426284 173.458750 220.482030 189.023326 224.958174 C230.497694 236.885598 271.041448 252.047450 310.165152 270.260698 z" />
        <path fill="#336699" d="M436.617649 281.403388 C408.399474 289.131869 378.060147 285.411707 350.231647 276.380130 C322.403146 267.348553 296.555310 253.232239 270.594427 239.740488 C240.109246 223.897480 209.070815 208.749318 176.245443 198.608208 C143.420072 188.467097 108.557919 183.446918 74.536637 188.232262 C60.550982 190.199444 46.852720 193.793561 33.192335 197.379959 C22.128224 200.284732 11.064112 203.189505 -0.000000 206.094277 C43.038700 171.290351 101.981987 157.020951 156.173555 168.286703 C203.147998 178.052105 244.272183 205.201877 286.951423 227.120906 C334.284544 251.430056 384.706194 269.717500 436.617647 281.403394 z" />
      </svg>
      <form
        onSubmit={onSubmitSearchQuery}
        className="homepage-search-form"
      >
        <input
          id="search-box"
          type="text"
          autoFocus
          disabled={disableForm}
          className="homepage-search-form-input"
          value={invoiceNumber}
          onChange={onChangeInvoiceNumber}
          placeholder="Invoice Search"
        />
      </form>
    </div>
  );
};
export default search;
