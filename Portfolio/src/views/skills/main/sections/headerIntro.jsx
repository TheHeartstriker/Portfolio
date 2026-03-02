"use client";
import { useEffect } from "react";
import "./headerIntro.css";
const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import { WorkCard } from "../workCard.jsx";
import { animateText } from "@/utils/animations/textAni.jsx";
import { lorem, smallLorem } from "@/utils/text";
import { gsap } from "gsap/gsap-core";
import { animateBlocks } from "./animations";
import { Separator } from "@/components/forViews/seperator";

function HeaderIntro() {
  function handleTextAnimation() {
    //
    // Create timeline and text animations
    //
    const timeline = gsap.timeline({ paused: true });
    const header = document.querySelector(".skill-header-intro-text h1");
    const subHeader = document.querySelector(".skill-header-intro-text h2");
    animateText(500, 0, header, timeline);
    animateText(500, 0, subHeader, timeline, "-=1");
    //
    // Collect the blocks
    const blocks = document.querySelectorAll(".skill-header-stats-item");
    animateBlocks(200, 0, blocks, timeline);
  }

  useEffect(() => {
    handleTextAnimation();
  }, []);
  return (
    <>
      {/*  */}
      {/* Header */}
      {/*  */}
      <div className="skill-header">
        {/* Intro  */}
        {/*  */}
        <div className="skill-header-intro">
          {/* Intro text*/}
          <div className="skill-header-intro-text">
            <h1>Your website, my mission</h1>
            <h2>Exceeding results in custom web development</h2>
          </div>
          <button>
            <h3>Learn more</h3>
          </button>
        </div>
        {/* Image */}
        {/*  */}
        <img src={"/imageTest4.png"}></img>
        {/* Stats  */}
        {/*  */}
        <div className="skill-header-stats">
          <div className="skill-header-stats-item">
            <h3>8</h3>
            <h4>Applications made</h4>
          </div>
          <div className="skill-header-stats-item">
            <h3>3</h3>
            <h4>Years of experience</h4>
          </div>

          <div className="skill-header-stats-item">
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
          header={"FGraphs"}
          para1={lorem}
          para2={smallLorem}
          mediaArray={[
            "/skill/FitShot.webp",
            "/skill/todoShot.webp",
            "/DynamicShot.webp",
          ]}
          scopePara={smallLorem}
          rolePara={smallLorem}
          servicesArr={["Fullstack", "Desgin", "UI/UX", "Animation"]}
          first={true}
          link={"https://www.fgraphs.com/"}
        />
        <WorkCard
          header={"Real estate"}
          para1={lorem}
          para2={smallLorem}
          mediaArray={["/skill/client1.webp"]}
          scopePara={smallLorem}
          rolePara={smallLorem}
          servicesArr={["Fullstack", "Desgin", "UI/UX", "Animation"]}
          reverse={true}
          link={"https://lively-sand-0233c801e.6.azurestaticapps.net/"}
        />
        <WorkCard
          header={"Todo"}
          para1={lorem}
          para2={smallLorem}
          mediaArray={["/skill/todoShot.webp"]}
          scopePara={smallLorem}
          rolePara={smallLorem}
          servicesArr={["Fullstack", "Desgin", "UI/UX", "Animation"]}
          link={"https://www.genesistodo.com/"}
        />
      </div>
    </>
  );
}

export default HeaderIntro;
