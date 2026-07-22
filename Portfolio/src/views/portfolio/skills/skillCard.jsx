import PropTypes from "prop-types";
import Arrow from "@/../public/icons/arrow";
export function SkillCard({
  title,
  para,
  active,
  imgUrl,
  onMouseEnter,
  mobile,
}) {
  return (
    <div
      className={`port-skills-container-card ${active ? "active" : ""}`}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={`port-skills-container-card-left ${active ? "active" : ""}`}
      >
        <div
          className={`port-skills-container-card-text ${active ? "active" : ""}`}
        >
          <h3>{title}</h3>
          {(active || mobile) && <p>{para}</p>}
        </div>
        <div
          className={`port-skills-container-card-icon ${active ? "active" : ""}`}
        >
          <h4>Read more</h4>
          <button>
            <Arrow />
          </button>
        </div>
      </div>
      <div
        className={`port-skills-container-card-right ${active ? "active" : ""}`}
      >
        {(active || mobile) && <img src={imgUrl} alt={title} />}
      </div>
    </div>
  );
}

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  para: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
};
