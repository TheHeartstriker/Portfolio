"use client";
import "./proFocus.css";

const back1 = "/skill/back1.png";
const back2 = "/skill/back2.jpg";
import UserGroup from "@/../public/icons/user-group";
import { Separator } from "@/components/forViews/seperator";
import { use, useEffect } from "react";
import { lorem, smallLorem } from "@/utils/text";
import { animateBlocks } from "./animations";

function ProFocus() {
  useEffect(() => {
    animateBlocks(
      { start: -100, end: 0, type: "x" },
      { el: "top", scroll: "100%" },
      { el: "bottom", scroll: "50%" },
      document.querySelectorAll(".skill-process-main-card"),
      { duration: 0.85, delay: 0, easing: "power2.out" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "y" },
      { el: "top", scroll: "100%" },
      { el: "bottom", scroll: "50%" },
      document.querySelectorAll(".skill-focus-container-card"),
      { duration: 1.25, delay: 0, easing: "back.out(1.05)" },
    );
  }, []);

  return (
    <>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <div className="skill-process">
        <Separator headerArr={["Process", "And Methodology"]} reverse={true} />
        {/*  */}
        {/* Main container */}
        <div className="skill-process-main">
          {/* Item 1 */}
          <div className="skill-process-main-card">
            <h4>01.</h4>
            <h3>Discovery And Research</h3>
            <p>{lorem}</p>
          </div>
          {/* Item 1 */}
          <div className="skill-process-main-card">
            <h4>02.</h4>
            <h3>Discovery And Research</h3>
            <p>{lorem}</p>
          </div>
          {/* Item 1 */}
          <div className="skill-process-main-card">
            <h4>03.</h4>
            <h3>Discovery And Research</h3>
            <p>{lorem}</p>
          </div>
          {/* Item 1 */}
          <div className="skill-process-main-card">
            <h4>04.</h4>
            <h3>Discovery And Research</h3>
            <p>{lorem}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <div className="skill-focus">
        <Separator headerArr={["Focus", "And Priorities"]} />
        <div className="skill-focus-container">
          {/* Card1 */}
          <div className="skill-focus-container-card">
            <h3>User Experience Accessibility through Repetition</h3>
            <div className="skill-focus-container-card-text">
              <div className="skill-focus-container-card-text-icon">
                <UserGroup />
              </div>
              <p>{lorem}</p>
            </div>
          </div>
          {/* Card2 */}
          <div className="skill-focus-container-card">
            <h3>User Experience Accessibility through Repetition</h3>
            <div className="skill-focus-container-card-text">
              <div className="skill-focus-container-card-text-icon">
                <UserGroup />
              </div>
              <p>{lorem}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProFocus;
