"use client";
import { useEffect, useState } from "react";
import "./headerIntro.css";
import { WorkCard } from "../workCard.jsx";
import { lorem, smallLorem } from "@/utils/text";
import { ScrollButton } from "@/components/nav/scrollButton";
import { Separator } from "@/components/separator/separator.jsx";
import HeaderAnimation from "../animations/headerAnimation.jsx";
import { FGraphsText, RealEstateText, TodoText } from "../text.js";

function HeaderIntro() {
  const headerimg = "/skill/headerimg.webp";
  const [activeCard1, setActiveCard1] = useState(3);
  const [activeCard2, setActiveCard2] = useState(3);
  const [activeCard3, setActiveCard3] = useState(3);
  const [activeCard4, setActiveCard4] = useState(3);

  return (
    <>
      {/*  */}
      {/* Header */}
      {/*  */}
      <HeaderAnimation />
      <div className="skill-header">
        {/* Intro  */}
        {/*  */}
        <div className="skill-header-intro">
          {/* Intro text*/}
          <div className="skill-header-intro-text">
            <h1>Your website, my mission</h1>
            <h2>Exceeding results in custom web development</h2>
          </div>
          <ScrollButton percent={110} className="skill-header-intro-button">
            <h3>Learn more</h3>
          </ScrollButton>
        </div>
        {/* Image */}
        {/*  */}
        <img src={headerimg} alt="Header" />
        {/* Stats  */}
        {/*  */}
        <div className="skill-header-stats">
          <div
            className={`skill-header-stats-item ${activeCard1 === 1 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(1)}
          >
            <h3>8</h3>
            <h4>Applications made</h4>
          </div>
          <div
            className={`skill-header-stats-item ${activeCard1 === 2 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(2)}
          >
            <h3>3</h3>
            <h4>Years of experience</h4>
          </div>
          <div
            className={`skill-header-stats-item ${activeCard1 === 3 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(3)}
          >
            <h3>3000+</h3>
            <h4>Hour's of work</h4>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Past work*/}
      {/*  */}
      <div className="skill-past">
        <Separator headerArr={["Past work", "And Projects"]} />
        {/* Item 1 */}
        {/*  */}
        <WorkCard
          header={FGraphsText.header}
          para1={FGraphsText.para1}
          para2={FGraphsText.para2}
          mediaArray={FGraphsText.media}
          scopePara={FGraphsText.scope}
          rolePara={FGraphsText.role}
          servicesArr={FGraphsText.services}
          first={true}
          link={"https://www.fgraphs.com/"}
          active={activeCard2}
          onMouseEnter={setActiveCard2}
        />
        <WorkCard
          header={RealEstateText.header}
          para1={RealEstateText.para1}
          para2={RealEstateText.para2}
          mediaArray={RealEstateText.media}
          scopePara={RealEstateText.scope}
          rolePara={RealEstateText.role}
          servicesArr={RealEstateText.services}
          reverse={true}
          link={"https://lively-sand-0233c801e.6.azurestaticapps.net/"}
          active={activeCard3}
          onMouseEnter={setActiveCard3}
        />
        <WorkCard
          header={TodoText.header}
          para1={TodoText.para1}
          para2={TodoText.para2}
          mediaArray={TodoText.media}
          scopePara={TodoText.scope}
          rolePara={TodoText.role}
          servicesArr={TodoText.services}
          link={"https://www.genesistodo.com/"}
          active={activeCard4}
          onMouseEnter={setActiveCard4}
        />
      </div>
    </>
  );
}

export default HeaderIntro;
