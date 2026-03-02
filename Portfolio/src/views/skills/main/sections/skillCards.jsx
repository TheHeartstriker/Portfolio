import Arrow from "@/../public/icons/arrow";
export function SkillCards({ title, para, active, imgUrl }) {
  return (
    <div className={`skill-myskills-container-card ${active ? "active" : ""}`}>
      <div
        className={`skill-myskills-container-card-left ${active ? "active" : ""}`}
      >
        <div
          className={`skill-myskills-container-card-text ${active ? "active" : ""}`}
        >
          <h3>{title}</h3>
          {active && <p>{para}</p>}
        </div>
        <div
          className={`skill-myskills-container-card-icon ${active ? "active" : ""}`}
        >
          <h4>Read more</h4>
          <button>
            <Arrow />
          </button>
        </div>
      </div>
      <div className="skill-myskills-container-card-right">
        {active && <img src={imgUrl} alt={title} />}
      </div>
    </div>
  );
}
