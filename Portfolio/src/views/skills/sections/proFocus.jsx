"use client";
import "./proFocus.css";

import { Separator } from "@/components/separator/separator";
import { useState } from "react";
import ProFocusAnimation from "../animations/proFocusAnimation";
import { processText, focusText } from "../text";

function ProFocus() {
  const [activeCard1, setActiveCard1] = useState(4);
  const [activeCard2, setActiveCard2] = useState(1);

  return (
    <>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <ProFocusAnimation />
      <div className="skill-process">
        <Separator headerArr={["Process", "And Methodology"]} reverse={true} />
        {/*  */}
        {/* Main container */}
        <div className="skill-process-main">
          {/* Item 1 */}
          <div
            className={`skill-process-main-card ${activeCard1 === 1 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(1)}
          >
            <h4>01.</h4>
            <h3>{processText.card1.header}</h3>
            <p>{processText.card1.para}</p>
          </div>
          {/* Item 2 */}
          <div
            className={`skill-process-main-card ${activeCard1 === 2 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(2)}
          >
            <h4>02.</h4>
            <h3>{processText.card2.header}</h3>
            <p>{processText.card2.para}</p>
          </div>
          {/* Item 3 */}
          <div
            className={`skill-process-main-card ${activeCard1 === 3 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(3)}
          >
            <h4>03.</h4>
            <h3>{processText.card3.header}</h3>
            <p>{processText.card3.para}</p>
          </div>
          {/* Item 4 */}
          <div
            className={`skill-process-main-card ${activeCard1 === 4 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(4)}
          >
            <h4>04.</h4>
            <h3>{processText.card4.header}</h3>
            <p>{processText.card4.para}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <div className="skill-focus">
        <Separator headerArr={["Focus", "And Priorities"]} />
        {/*  */}
        {/* Card group one */}
        <div className="skill-focus-container">
          {/* Card1 */}
          <div
            className={`skill-focus-container-card ${activeCard2 === 1 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard2(1)}
          >
            <h3>{focusText.card1.header}</h3>
            <div className="skill-focus-container-card-text">
              <p>{focusText.card1.para}</p>
            </div>
          </div>
          {/* Card2 */}
          <div
            className={`skill-focus-container-card ${activeCard2 === 2 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard2(2)}
          >
            <h3>{focusText.card2.header}</h3>
            <div className="skill-focus-container-card-text">
              <p>{focusText.card2.para}</p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Card group two */}
        <div className="skill-focus-container">
          {/* Card1 */}
          <div
            className={`skill-focus-container-card ${activeCard2 === 3 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard2(3)}
          >
            <h3>{focusText.card3.header}</h3>
            <div className="skill-focus-container-card-text">
              <p>{focusText.card3.para}</p>
            </div>
          </div>
          {/* Card2 */}
          <div
            className={`skill-focus-container-card ${activeCard2 === 4 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard2(4)}
          >
            <h3>{focusText.card4.header}</h3>
            <div className="skill-focus-container-card-text">
              <p>{focusText.card4.para}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProFocus;
