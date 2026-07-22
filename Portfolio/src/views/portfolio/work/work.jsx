"use client";
import { useState } from "react";
import "./work.css";
import { WorkCard } from "./workCard.jsx";
import { Separator } from "@/components/separator/separator.jsx";
import { FGraphsText, RealEstateText, EventText } from "../text.js";
import WorkAni from "./workAni.jsx";

function Work() {
  const [activeCard2, setActiveCard2] = useState(3);
  const [activeCard3, setActiveCard3] = useState(3);
  const [activeCard4, setActiveCard4] = useState(3);

  return (
    <>
      <WorkAni />
      <div className="port-work">
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
          header={EventText.header}
          para1={EventText.para1}
          para2={EventText.para2}
          mediaArray={EventText.media}
          scopePara={EventText.scope}
          rolePara={EventText.role}
          servicesArr={EventText.services}
          link={"https://event-practice-sage.vercel.app/"}
          active={activeCard4}
          onMouseEnter={setActiveCard4}
        />
      </div>
    </>
  );
}

export default Work;
