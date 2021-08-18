import React, { PureComponent } from "react";

import "./footer.css";

export default class Footer extends PureComponent {
  render() {
    return (
      <div className="footer">
        <a
          href="https://www.amnuz.com"
          target="_blank"
          rel="noreferrer"
        >
          <span className="footer-typo">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            | Designed and Developed by Amnuz Technologies
          </span>
        </a>
      </div>
    );
  }
}
