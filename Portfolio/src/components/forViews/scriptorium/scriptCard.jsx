import PropTypes from "prop-types";
import Link from "next/link";
import TimeSharp from "../../../../public/icons/time-sharp";
export function ScriptCard({ articleDes, link, reverse }) {
  return (
    <div className={`script-article ${reverse ? "reverse" : ""}`}>
      <div className="script-article-img">
        {articleDes.tags.map((tag, index) => (
          <span key={index}>
            <h4>{tag}</h4>
          </span>
        ))}
        <img src={articleDes.image} alt={articleDes.title} />
      </div>
      <div className="script-article-info">
        <h3>{articleDes.title}</h3>
        <h4>
          {articleDes.date.day} {articleDes.date.month} {articleDes.date.year}
        </h4>
        <p>{articleDes.des}</p>
        <div className="script-article-tags">
          <div className="script-article-tags-icon">
            <TimeSharp />
            <h4>{articleDes.readingTime}min</h4>
          </div>
          <button>
            <h4>Read article</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

ScriptCard.propTypes = {
  articleDes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
};
