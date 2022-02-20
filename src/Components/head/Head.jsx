import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function Head({ title, content }) {
  const router = useLocation();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? `${title} - Duba Travels` : "Payments - Duba Travels"}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={content || "The state-of-the-art payment portal allows you to pay for and verify payments made towards Duba Travels."} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://payments.dubatravels.com${router.pathname}`} />
      <meta property="og:title" content={title ? `${title} - Duba Travels` : "Payments - Duba Travels"} />
      <meta property="og:description" content={content || "The state-of-the-art payment portal allows you to pay for and verify payments made towards Duba Travels."} />
      <meta property="twitter:image" content="https://payments.dubatravels.com/seo-image.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://payments.dubatravels.com${router.pathname}`} />
      <meta property="twitter:title" content={title ? `${title} - Duba Travels` : "Payments - Duba Travels"} />
      <meta property="twitter:description" content={content || "The state-of-the-art payment portal allows you to pay for and verify payments made towards Duba Travels."} />
      <meta property="twitter:image" content="https://payments.dubatravels.com/seo-image.jpg" />
      <script src="404.js" type="text/javascript" />
      <script src="cw.js" type="text/javascript" />
    </Helmet>
  );
}

export default Head;
