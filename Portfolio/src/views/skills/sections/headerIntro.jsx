"use client";
import { useEffect, useState } from "react";
import "./headerIntro.css";
const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import { WorkCard } from "../workCard.jsx";
import { animateText } from "@/utils/animations/textAni.jsx";
import { lorem, smallLorem } from "@/utils/text";
import { gsap } from "gsap/gsap-core";
import { animateBlocks } from "../../../utils/animations/animations";
import { ScrollButton } from "@/components/nav/scrollButton";
import { Separator } from "@/components/separator/separator.jsx";
function HeaderIntro() {
  const [activeCard1, setActiveCard1] = useState(3);
  const [activeCard2, setActiveCard2] = useState(3);
  const [activeCard3, setActiveCard3] = useState(3);
  const [activeCard4, setActiveCard4] = useState(3);
  function handleTextAnimation() {
    //
    // Main header section
    // header text animation
    const timeline = gsap.timeline();
    const header = document.querySelector(".skill-header-intro-text h1");
    const subHeader = document.querySelector(".skill-header-intro-text h2");
    animateText({ start: 150, end: 0 }, [header, subHeader], timeline, {
      duration: 0.5,
      easing: "power1.out",
    });

    //
    // Large top block and button animation
    const Topblocks = document.querySelectorAll(
      ".skill-header-intro button, .skill-header img",
    );
    animateBlocks(
      { start: 150, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      Topblocks,
      {
        duration: 1.25,
        easing: "back.out(1.05)",
        offset: "-=0.25",
      },
      timeline,
    );
    //
    // Bottom stats animation
    const Bottomblocks = document.querySelectorAll(".skill-header-stats-item");
    animateBlocks(
      { start: 150, end: 0, type: "x" },
      null,
      null,
      Bottomblocks,
      {
        duration: 0.75,
        easing: "power2.out",
        offset: "<+0.5",
      },
      timeline,
    );
    //
    // Script cards animation
    // Large main part
    const cards = document.querySelectorAll(".skill-past-item");

    cards.forEach((card) => {
      // Animate the large block
      animateBlocks(
        { start: 100, end: 0, type: "x" },
        { el: "top", scroll: "90%" },
        { el: "bottom", scroll: "40%" },
        [card.querySelector(".skill-past-item-main")],
        {
          duration: 1.25,
          delay: 0,

          easing: "back.out(1.05)",
        },
      );

      // Scoped to the stats sibling, not the main block
      const smallBlocks = card.querySelectorAll(
        ".skill-past-item-stats-con, .skill-past-item-stats-con-sq-it",
      );
      animateBlocks(
        { start: 100, end: 0, type: "x" },
        { el: "top", scroll: "90%" },
        { el: "bottom", scroll: "40%" },
        smallBlocks,
        {
          duration: 0.85,
          delay: 0,

          easing: "power2.out",
        },
      );
    });
  }

  useEffect(() => {
    handleTextAnimation();
  }, []);

  useEffect(() => {
    console.log(activeCard2);
  }, [activeCard2]);
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
          <ScrollButton percent={110} className="skill-header-intro-button">
            <h3>Learn more</h3>
          </ScrollButton>
        </div>
        {/* Image */}
        {/*  */}
        <img src={"/imageTest4.png"}></img>
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
          active={activeCard2}
          onMouseEnter={setActiveCard2}
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
          active={activeCard3}
          onMouseEnter={setActiveCard3}
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
          active={activeCard4}
          onMouseEnter={setActiveCard4}
        />
      </div>
    </>
  );
}

export default HeaderIntro;
