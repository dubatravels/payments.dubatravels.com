import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Head = ({ title, content }) => {
  const router = useLocation();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? `${title} - Duba Travels` : "Duba Travel and Tourism"}</title>
      <link rel="icon" href="https://portal.dubatravels.com/favicon.ico" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={content || "Duba Travels Payments"} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`%PUBLIC_URL%/${router.pathname}`} />
      <meta property="og:title" content={title ? `${title} - Duba Travels` : "Duba Travel and Tourism"} />
      <meta property="og:description" content={content || "Duba Travels Payments"} />
      <meta property="twitter:image" content="%PUBLIC_URL%/seo-image.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`%PUBLIC_URL%/${router.pathname}`} />
      <meta property="twitter:title" content={title ? `${title} - Duba Travels` : "Duba Travel and Tourism"} />
      <meta property="twitter:description" content={content || "Duba Travels Payments"} />
      <meta property="twitter:image" content="%PUBLIC_URL%/seo-image.jpg" />
    </Helmet>
  );
};

export default Head;
