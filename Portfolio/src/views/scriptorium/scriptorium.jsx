import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
} from "./articles/articleDes.js";
import { ScriptCard } from "../../components/scriptorium/scriptCard.jsx";
import PillAnimation from "./pillAnimation.jsx";

import "./scriptorium.css";

function Scriptorium() {
  return (
    <div className="main-scriptorium-container">
      <PillAnimation />
      <div className="article-card-container">
        <ScriptCard articleDes={desParticle} link={"/scriptorium/particle"} />

        <ScriptCard
          articleDes={desMappingFullstack}
          link={"/scriptorium/mapping-fullstack"}
        />

        <ScriptCard
          articleDes={desPolySVG}
          link={"/scriptorium/poly-svg-background"}
        />
      </div>
    </div>
  );
}

export default Scriptorium;
