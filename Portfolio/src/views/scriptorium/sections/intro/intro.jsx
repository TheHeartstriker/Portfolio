import NewspaperOutline from "@/../public/icons/newspaper-outline.jsx";
import NumbersIcon from "@/../public/icons/numbers.jsx";
import CalendarTimeIcon from "@/../public/icons/calendar-time.jsx";
import TimeSharp from "@/../public/icons/time-sharp.jsx";
import { getTotalWords, getTotalTimeHour } from "../counters.jsx";
import { introRecentText } from "../text.js";
import { ScrollButton } from "@/components/nav/scrollButton.jsx";
import IntroAni from "./introAni.jsx";
import "./intro.css";

function Intro() {
  return (
    <div className="scriptorium-intro">
      <IntroAni />
      <div className="scriptorium-intro-text">
        <h1>
          Your next <br />
          Adventure Awaits
        </h1>
        <div className="scriptorium-intro-body-text">
          <div className="scriptorium-intro-body-text-container">
            <p>{introRecentText.intro.para}</p>
          </div>
          <ScrollButton percent={200}>
            <h2>Read now</h2>
          </ScrollButton>
        </div>
      </div>
      <img
        src="/scriptorium/main/introImage.webp"
        alt="Scriptorium intro image"
      />
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
  );
}

export default Intro;
