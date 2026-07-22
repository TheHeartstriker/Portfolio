"use client";
import "./focus.css";

import { useState } from "react";
import { Separator } from "@/components/separator/separator";
import FocusAni from "./focusAni";
import { focusText } from "../text";

function Focus() {
  const [activeCard, setActiveCard] = useState(1);

  return (
    <div className="port-focus">
      <FocusAni />
      <Separator headerArr={["Focus", "And Priorities"]} />

      <div className="port-focus-container">
        <div
          className={`port-focus-container-card ${activeCard === 1 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(1)}
        >
          <h3>{focusText.card1.header}</h3>
          <div className="port-focus-container-card-text">
            <p>{focusText.card1.para}</p>
          </div>
        </div>

        <div
          className={`port-focus-container-card ${activeCard === 2 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(2)}
        >
          <h3>{focusText.card2.header}</h3>
          <div className="port-focus-container-card-text">
            <p>{focusText.card2.para}</p>
          </div>
        </div>
      </div>

      <div className="port-focus-container">
        <div
          className={`port-focus-container-card ${activeCard === 3 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(3)}
        >
          <h3>{focusText.card3.header}</h3>
          <div className="port-focus-container-card-text">
            <p>{focusText.card3.para}</p>
          </div>
        </div>

        <div
          className={`port-focus-container-card ${activeCard === 4 ? "active" : ""}`}
          onMouseEnter={() => setActiveCard(4)}
        >
          <h3>{focusText.card4.header}</h3>
          <div className="port-focus-container-card-text">
            <p>{focusText.card4.para}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Focus;
