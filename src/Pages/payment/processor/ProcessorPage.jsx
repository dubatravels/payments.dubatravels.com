/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chance from "chance";

import "./processor.css";

function ProcessorPage() {
  const [roomName, setRoomName] = useState("");
  const chanceObj = new Chance();
  const { id } = useParams();

  useEffect(() => {
    // window.console.log = (function (oldLog) {
    //     return function (...args) {
    //         oldLog.apply(window.console, args);
    //         // send to server

    //     };
    //     }
    // )(window.console.log);
    // const random = id || chanceObj.string({ length: 11, alpha: true, numeric: true });
    const random = id || chanceObj.string({ length: 11, alpha: true, numeric: true });
    setRoomName(`DubaCargo-${random}`);
  }, []);

  return (
    <div className="processor-page">
      <iframe
        allow="camera, microphone, fullscreen, display-capture, autoplay"
        src={`https://meet.jit.si/${roomName}`}
        // src="https://8x8.vc/Duba/DubaCargo"
        className="processor-page-iframe"
        frameBorder="0"
        title="test"
      />
    </div>
  );
}

export default ProcessorPage;
