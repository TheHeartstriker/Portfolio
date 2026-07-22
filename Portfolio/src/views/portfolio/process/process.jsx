"use client";
import "./process.css";

import { useState } from "react";
import { Separator } from "@/components/separator/separator";
import ProcessAni from "./processAni";
import { processText } from "../text";

function Process() {
  const [activeCard, setActiveCard] = useState(4);

  return (
    <div className="port-process">
      <ProcessAni />
      <Separator headerArr={["Process", "And Methodology"]} reverse={true} />
      <div className="port-process-main">
        <div
          className={`port-process-main-card ${activeCard === 1 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(1)}
        >
          <h4>01.</h4>
          <h3>{processText.card1.header}</h3>
          <p>{processText.card1.para}</p>
        </div>

        <div
          className={`port-process-main-card ${activeCard === 2 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(2)}
        >
          <h4>02.</h4>
          <h3>{processText.card2.header}</h3>
          <p>{processText.card2.para}</p>
        </div>

        <div
          className={`port-process-main-card ${activeCard === 3 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(3)}
        >
          <h4>03.</h4>
          <h3>{processText.card3.header}</h3>
          <p>{processText.card3.para}</p>
        </div>

        <div
          className={`port-process-main-card ${activeCard === 4 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(4)}
        >
          <h4>04.</h4>
          <h3>{processText.card4.header}</h3>
          <p>{processText.card4.para}</p>
        </div>
      </div>
    </div>
  );
}

export default Process;
