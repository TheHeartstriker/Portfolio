import NewspaperOutline from "@/../public/icons/newspaper-outline.jsx";
import NumbersIcon from "@/../public/icons/numbers.jsx";
import CalendarTimeIcon from "@/../public/icons/calendar-time.jsx";
import TimeSharp from "@/../public/icons/time-sharp.jsx";
import Arrow from "@/../public/icons/arrow.jsx";
import "./scriptoriumIntroRecent.css";
import { getTotalWords, getTotalTimeHour } from "../counters.jsx";
import { introRecentText } from "./text.js";
import { ScrollButton } from "@/components/nav/scrollButton.jsx";
import { getTopTags, getRecentArticles } from "../counters.jsx";
import IntroRecentAnimation from "./IntroRecentAnimation.jsx";

function ScriptoriumIntroRecent() {
  const topTags = getTopTags(3);
  const mostRecentArticles = getRecentArticles(3);
  return (
    <>
      {/*  */}
      {/* Intro */}
      {/*  */}
      <IntroRecentAnimation />
      <div className="scriptorium-intro">
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
              <p>{introRecentText.recent.para}</p>
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
            <img src={topTags.tag1.imgSrc} alt="Scriptorium intro image" />
            <h3>{topTags.tag1.tagname}</h3>
            <div className="scriptorium-recent-card-cat-item-icon">
              <NewspaperOutline />
              <h4>{topTags.tag1.count} articles</h4>
            </div>
          </div>
          <div className="scriptorium-recent-card-cat-item-container">
            <div className="scriptorium-recent-card-cat-item">
              <img src={topTags.tag2.imgSrc} alt="Scriptorium intro image" />
              <h3>{topTags.tag2.tagname}</h3>
              <div className="scriptorium-recent-card-cat-item-icon">
                <NewspaperOutline />
                <h4>{topTags.tag2.count} articles</h4>
              </div>
            </div>
            <div className="scriptorium-recent-card-cat-item">
              <img src={topTags.tag3.imgSrc} alt="Scriptorium intro image" />
              <h3>{topTags.tag3.tagname}</h3>
              <div className="scriptorium-recent-card-cat-item-icon">
                <NewspaperOutline />
                <h4>{topTags.tag3.count} articles</h4>
              </div>
            </div>
          </div>
        </div>
        {/* Right articles cards/images */}
        <div className="scriptorium-recent-card-articles">
          <div className="scriptorium-recent-card-articles-item">
            <img
              src={`${mostRecentArticles[0].image}`}
              alt="Scriptorium intro image"
            />
            <h3>{mostRecentArticles[0].title}</h3>
            <p>{mostRecentArticles[0].des}</p>
            <a href={mostRecentArticles[0].slug}></a>
          </div>
          <div className="scriptorium-recent-card-articles-item">
            <img
              src={`${mostRecentArticles[1].image}`}
              alt="Scriptorium intro image"
            />
            <h3>{mostRecentArticles[1].title}</h3>
            <p>{mostRecentArticles[1].des}</p>
            <a href={mostRecentArticles[1].slug}></a>
          </div>
          <div className="scriptorium-recent-card-articles-item">
            <img
              src={`${mostRecentArticles[2].image}`}
              alt="Scriptorium intro image"
            />
            <h3>{mostRecentArticles[2].title}</h3>
            <p>{mostRecentArticles[2].des}</p>
            <a href={mostRecentArticles[2].slug}></a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScriptoriumIntroRecent;
