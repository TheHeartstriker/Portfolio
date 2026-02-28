import Arrow from "../../../../out/icons/arrow";
import { Separator } from "@/components/forViews/seperator";
import { lorem } from "@/utils/text";

export function WorkCard({
  header,
  para1,
  para2,
  imgUrl,
  scopePara,
  rolePara,
  servicesArr,
  reverse,
  first,
}) {
  return (
    <div className="skill-past-item">
      {first && <Separator header="My Past Work" para={lorem} />}
      {/* Main section */}
      <div className={`skill-past-item-main ${reverse ? "reverse" : ""}`}>
        <div className="skill-past-item-main-text">
          <h3>{header}</h3>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
        <div className="skill-past-item-main-image">
          <img src={imgUrl}></img>
          <button className="skill-past-item-main-image-link">
            <Arrow />
          </button>
          <div className="skill-past-item-main-image-con">
            <button>
              <Arrow />
            </button>
            <span></span>
            <span></span>
            <span></span>
            <button>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      {/* Stats section */}
      <div className={`skill-past-item-stats ${reverse ? "reverse" : ""}`}>
        <div className="skill-past-item-stats-con">
          <h4>Role</h4>
          <p>{rolePara}</p>
        </div>
        <div className="skill-past-item-stats-con">
          <h4>Scope</h4>
          <p>{scopePara}</p>
        </div>
        <div className="skill-past-item-stats-con-sq">
          {servicesArr.map((tag, index) => (
            <div className="skill-past-item-stats-con-sq-it" key={index}>
              <div className="skill-past-item-stats-con-sq-it-text">
                <h5>{tag}</h5>
                <h6>Services</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
