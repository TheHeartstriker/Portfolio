import "./lightSkills.css";
import { Separator } from "@/components/forViews/seperator";
import { lorem, smallLorem } from "@/utils/text";
const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import Arrow from "../../../../out/icons/arrow";
function LightSkills() {
  return (
    <>
      {/*  */}
      {/* Gallery container */}
      {/*  */}
      <div className="skill-highlights">
        <Separator header="My Highlights" para={lorem} />
        {/* Gallery container 'the images' */}
        {/*  */}
        <div className="skill-highlights-gal">
          <div className="skill-highlights-gal-item">
            <img src={fitShot} />
          </div>
          <div className="skill-highlights-gal-item">
            <img src={fitShot} />
            <div className="skill-highlights-gal-item-text">
              <p>{smallLorem}</p>
            </div>
          </div>
          <div className="skill-highlights-gal-item">
            <img src={fitShot} />
          </div>
          <button>
            <Arrow />
          </button>
          <button>
            <Arrow />
          </button>
        </div>
      </div>
      <div className="skill-myskills">
        <Separator header="My Skills" para={lorem} />
        <div className="skill-myskills-container">
          <div className="skill-myskills-container-card">
            <img src={fitShot}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
          <div className="skill-myskills-container-card">
            <img src={fitShot}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
          <div className="skill-myskills-container-card">
            <img src={fitShot}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LightSkills;
