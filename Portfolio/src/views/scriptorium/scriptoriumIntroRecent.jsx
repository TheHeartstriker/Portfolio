"use client";
import NewspaperOutline from "../../../public/icons/newspaper-outline.jsx";
import NumbersIcon from "../../../public/icons/numbers.jsx";
import CalendarTimeIcon from "../../../public/icons/calendar-time.jsx";
import TimeSharp from "../../../public/icons/time-sharp.jsx";
import Arrow from "../../../out/icons/arrow.jsx";
import "./scriptoriumIntroRecent.css";

import { getTotalWords, getTotalTimeHour } from "./counters.jsx";

function ScriptoriumIntroRecent() {
  return (
    <>
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
        <div className="scriptorium-intro-data-bar">
          {/* Item1 */}
          <div className="scriptorium-intro-data-bar-item">
            <NumbersIcon />
            <div className="scriptorium-intro-data-bar-item-text">
              <h3>Words written</h3>
              <p>{getTotalWords()}</p>
            </div>
          </div>
          {/* Item2 */}
          <div className="scriptorium-intro-data-bar-item">
            <NewspaperOutline />
            <div className="scriptorium-intro-data-bar-item-text">
              <h3>Articles Made</h3>
              <p>7</p>
            </div>
          </div>
          {/* Item3 */}
          <div className="scriptorium-intro-data-bar-item">
            <CalendarTimeIcon />
            <div className="scriptorium-intro-data-bar-item-text">
              <h3>Years running</h3>
              <p>2</p>
            </div>
          </div>
          {/* Item4 */}
          <div className="scriptorium-intro-data-bar-item">
            <TimeSharp />
            <div className="scriptorium-intro-data-bar-item-text">
              <h3>Hours of reading</h3>
              <p>{getTotalTimeHour()}</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Top categories */}
      {/*  */}
      <div className="scriptorium-recent-card">
        {/* Left side */}
        {/* Top section left side */}
        <div className="scriptorium-recent-card-content">
          <div className="scriptorium-recent-card-content-header">
            <div className="scriptorium-recent-card-content-header-text">
              <h2>Recent</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="scriptorium-recent-card-content-header-icon">
              <span>
                <Arrow />
              </span>
            </div>
          </div>
          {/* Bottom section */}
          {/* Bottom section left side */}
          <div className="scriptorium-recent-card-cat-item">
            <img src="/imageTest2.webp" alt="Scriptorium intro image" />
            <h3>Design</h3>
            <div className="scriptorium-recent-card-cat-item-icon">
              <NewspaperOutline />
              <h4>23 articles</h4>
            </div>
          </div>
          <div className="scriptorium-recent-card-cat-item-container">
            <div className="scriptorium-recent-card-cat-item">
              <img src="/imageTest2.webp" alt="Scriptorium intro image" />
              <h3>Design</h3>
              <div className="scriptorium-recent-card-cat-item-icon">
                <NewspaperOutline />
                <h4>23 articles</h4>
              </div>
            </div>
            <div className="scriptorium-recent-card-cat-item">
              <img src="/imageTest2.webp" alt="Scriptorium intro image" />
              <h3>Design</h3>
              <div className="scriptorium-recent-card-cat-item-icon">
                <NewspaperOutline />
                <h4>23 articles</h4>
              </div>
            </div>
          </div>
        </div>
        {/* Right articles cards/images */}
        <div className="scriptorium-recent-card-articles">
          <div className="scriptorium-recent-card-articles-item">
            <img src="/imageTest.png" alt="Scriptorium intro image" />
            <h3>Design systems and colors</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="scriptorium-recent-card-articles-item">
            <img src="/imageTest1.png" alt="Scriptorium intro image" />
            <h3>Design systems and colors</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="scriptorium-recent-card-articles-item">
            <img src="/imageTest2.webp" alt="Scriptorium intro image" />
            <h3>Design systems and colors</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScriptoriumIntroRecent;
