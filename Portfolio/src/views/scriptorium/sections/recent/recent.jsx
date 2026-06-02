import NewspaperOutline from "@/../public/icons/newspaper-outline.jsx";
import Arrow from "@/../public/icons/arrow.jsx";
import { introRecentText } from "../text.js";
import { getTopTags, getRecentArticles } from "../counters.jsx";
import "./recent.css";
import RecentAni from "./recentAni.jsx";

function Recent() {
  const topTags = getTopTags(3);
  const mostRecentArticles = getRecentArticles(3);
  return (
    <div className="scriptorium-recent-card">
      <RecentAni />
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
  );
}

export default Recent;
