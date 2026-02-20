import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./articles/articleDes.js";
import NewspaperOutline from "../../../public/icons/newspaper-outline.jsx";
import TimeSharp from "../../../public/icons/time-sharp.jsx";
import { ScriptCard } from "../../components/forViews/scriptorium/scriptCard.jsx";
import PillAnimation from "@/components/forStyle/animations/pillAnimation.jsx";

import "./scriptorium.css";

function Scriptorium() {
  const tags = [".script-article-tags span"];
  return (
    <>
      <div className="main-scriptorium-container">
        {/*  */}
        {/* Intro */}
        {/*  */}
        <div className="scriptorium-intro">
          <div className="scriptorium-intro-text">
            <h1>
              Your next <br />
              Adventure Awaits
            </h1>
            <div className="scriptorium-intro-body-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <button>Read now</button>
            </div>
          </div>
          <img src="/imageTest1.png" alt="Scriptorium intro image" />
        </div>
        {/*  */}

        {/* Top categories */}
        {/*  */}

        <div className="scriptorium-top-categories">
          <h2>Top categories</h2>
          <div className="top-categories-card-container">
            {/* Card1 */}
            <div className="top-categories-card">
              <div className="top-categories-card-img">
                <img src="/imageTest.png" alt="Design category image" />
              </div>
              <div className="top-categories-card-info">
                <h3>Design</h3>
                <div className="top-categories-card-count-info">
                  <NewspaperOutline />
                  <p>12 articles</p>
                </div>
              </div>
            </div>
            {/* Card2 */}
            <div className="top-categories-card">
              <div className="top-categories-card-img">
                <img src="/imageTest.png" alt="Design category image" />
              </div>
              <div className="top-categories-card-info">
                <h3>Design</h3>
                <div className="top-categories-card-count-info">
                  <NewspaperOutline />
                  <p>12 articles</p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="top-categories-card">
              <div className="top-categories-card-img">
                <img src="/imageTest.png" alt="Design category image" />
              </div>
              <div className="top-categories-card-info">
                <h3>Design</h3>
                <div className="top-categories-card-count-info">
                  <NewspaperOutline />
                  <p>12 articles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Most recent */}
        {/*  */}

        <div className="scriptorium-most-recent">
          <h2>Most recent</h2>
          <div className="most-recent-card-container">
            {/* Card1 */}
            <div className="most-recent-card">
              <div className="most-recent-card-img">
                <img src="/imageTest.png" alt="Most recent article image" />
              </div>
              <div className="most-recent-card-info">
                <h3>How to Choose Colors When Designing a Website</h3>
                <div className="most-recent-card-info-card">
                  <span>
                    <h4>Skills</h4>
                  </span>
                  <span>
                    <h4>Design</h4>
                  </span>
                  <div className="most-recent-card-icon-container">
                    <TimeSharp />
                    <p>20min</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card2 */}
            <div className="most-recent-card">
              <div className="most-recent-card-img">
                <img src="/imageTest.png" alt="Most recent article image" />
              </div>
              <div className="most-recent-card-info">
                <h3>How to Choose Colors When Designing a Website</h3>
                <div className="most-recent-card-info-card">
                  <span>
                    <h4>Skills</h4>
                  </span>
                  <span>
                    <h4>Design</h4>
                  </span>
                  <div className="most-recent-card-icon-container">
                    <TimeSharp />
                    <p>20min</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card3 */}
            <div className="most-recent-card">
              <div className="most-recent-card-img">
                <img src="/imageTest.png" alt="Most recent article image" />
              </div>
              <div className="most-recent-card-info">
                <h3>How to Choose Colors When Designing a Website</h3>
                <div className="most-recent-card-info-card">
                  <span>
                    <h4>Skills</h4>
                  </span>
                  <span>
                    <h4>Design</h4>
                  </span>
                  <div className="most-recent-card-icon-container">
                    <TimeSharp />
                    <p>20min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PillAnimation tags={tags} />
        <div className="article-card-container">
          <ScriptCard
            articleDes={desHoverCards}
            link={"/scriptorium/hover-cards"}
          />
          <ScriptCard
            articleDes={desBackendLookLike}
            link={"/scriptorium/backend-look-like"}
          />
          <ScriptCard
            articleDes={desFlowField}
            link={"/scriptorium/flow-fields"}
          />

          <ScriptCard
            articleDes={desPolySVG}
            link={"/scriptorium/poly-svg-background"}
          />
          <ScriptCard articleDes={desParticle} link={"/scriptorium/particle"} />

          <ScriptCard
            articleDes={desMappingFullstack}
            link={"/scriptorium/mapping-fullstack"}
          />
          <ScriptCard
            articleDes={desColor}
            link={"/scriptorium/how-to-color"}
          />
        </div>
      </div>
    </>
  );
}

export default Scriptorium;
