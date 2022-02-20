/* eslint-disable func-names */
if (navigator.userAgent !== "ReactSnap") {
  (function (d, t) {
    const BASE_URL = "https://chat.dubatravels.com";
    const g = d.createElement(t);
    const s = d.getElementsByTagName(t)[0];
    g.src = `${BASE_URL}/packs/js/sdk.js`;
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);
    g.onload = function () {
      window.chatwootSDK.run({
        websiteToken: "6iPVdTxdpfmoE54ai2GDzkZD",
        baseUrl: BASE_URL,
      });
    };
  }(document, "script"));
}
