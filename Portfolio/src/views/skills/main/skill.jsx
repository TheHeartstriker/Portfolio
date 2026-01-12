import "./skill.css";
import {
  TechStacks,
  Header,
  Paras,
  UsedTechApp1,
  UsedTechApp2,
  UsedTechApp3,
  UsedTechApp4,
  NoteWortheyH,
  NoteWortheyP,
} from "./text.js";
const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import {
  CreateFolder,
  CreateFeatured,
} from "@/components/forViews/skillPage/index.js";
import Poly from "../../../components/svg/poly.jsx";
import PillAnimation from "@/components/forStyle/animations/pillAnimation";
import Link from "next/link";

function Skill() {
  const tags = [
    ".blue-pill",
    ".blue-pill h2",
    ".blue-pill-2",
    ".blue-pill-2 h2",
  ];
  return (
    <div className="main-skill-container">
      <svg style={{ display: "none" }}>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <PillAnimation tags={tags} />
      <h1 style={{ display: "none" }}>Skills & Projects Portfolio</h1>
      {/* Over head container for tech stacks */}
      <div className="separator" id="Sep1">
        <Link
          id="gallery-link"
          href="/skills/gallery"
          aria-label="Link to gallery primarly visual"
        ></Link>
        <h3>01.</h3>
        <h2>Known tech</h2>
        <hr></hr>
        <div className="gallery-link">
          <Poly className="gallery-svg" />
        </div>
      </div>
      {/* Tech stacks container */}
      <div className="tech-stacks">
        {TechStacks.map((tech, index) => (
          <div className="blue-pill" key={index}>
            <h4>{tech}</h4>
          </div>
        ))}
      </div>
      {/* Separator for the next section */}
      <div className="separator" id="Sep2">
        <hr></hr>
        <h2>Stuff I made</h2>
        <h3>02.</h3>
      </div>
      {/* Overhead container for main apps */}
      <CreateFeatured
        Header={Header[1]}
        Para={Paras[1]}
        Skills={UsedTechApp2}
        ImageSrc={fitShot}
        Link1="https://www.fgraphs.com"
        Link2="https://github.com/TheHeartstriker/FitnessApp"
      />
      <CreateFeatured
        Header={Header[3]}
        Para={Paras[3]}
        Mirror={true}
        Skills={UsedTechApp4}
        ImageSrc={client1}
        Link1="https://lively-sand-0233c801e.6.azurestaticapps.net"
      />
      <CreateFeatured
        Header={Header[0]}
        Para={Paras[0]}
        Skills={UsedTechApp1}
        ImageSrc={dynamicAnimations}
        Link1="https://www.dynamicanimations.com"
        Link2="https://github.com/TheHeartstriker/DynamicAnimations"
      />
      <CreateFeatured
        Header={Header[2]}
        Para={Paras[2]}
        Skills={UsedTechApp3}
        Mirror={true}
        End={true}
        ImageSrc={todoShot}
        Link1="https://www.genesistodo.com"
        Link2="https://github.com/TheHeartstriker/ToDoApp"
      />
      <div className="separator">
        <h3>03.</h3>
        <h2>
          Other Code <br></br> stuff
        </h2>
        <hr></hr>
      </div>
      <div className="folder-container">
        <CreateFolder
          Header={NoteWortheyH[0]}
          Para={NoteWortheyP[0]}
          Link={"https://github.com/TheHeartstriker/BookApp"}
        />
        <CreateFolder
          Header={NoteWortheyH[1]}
          Para={NoteWortheyP[1]}
          Link={"https://github.com/TheHeartstriker/Portfolio"}
        />
        <CreateFolder
          Header={NoteWortheyH[2]}
          Para={NoteWortheyP[2]}
          Link={"https://github.com/TheHeartstriker/CS50Final"}
        />
      </div>
    </div>
  );
}

export default Skill;
