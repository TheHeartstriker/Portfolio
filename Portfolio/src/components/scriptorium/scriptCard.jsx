import PropTypes from "prop-types";

export function ScriptCard({ articleDes, link }) {
  return (
    <div className="script-article">
      <a href={link} className="full-link-overlay" />
      <div className="script-article-img">
        <img src={articleDes.image} alt={articleDes.title} />
      </div>
      <div className="script-article-info">
        <h2>{articleDes.title}</h2>
        <p>{articleDes.des}</p>
        <div className="script-article-tags">
          {articleDes.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
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
