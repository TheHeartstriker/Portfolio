import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
} from "./articles/articleDes.js";
import { ScriptCard } from "../../components/scriptorium/scriptCard.jsx";
import PillAnimation from "./pillAnimation.jsx";

import "./scriptorium.css";

function Scriptorium() {
  return (
    <div className="main-scriptorium-container">
      <PillAnimation />
      <div className="article-card-container">
        <ScriptCard
          articleDes={desBackendLookLike}
          link={"/scriptorium/backend-look-like"}
        />
        <ScriptCard
          articleDes={desFlowField}
          link={"/scriptorium/flow-fields"}
        />

        <ScriptCard
          articleDes={desPolySVG}
          link={"/scriptorium/poly-svg-background"}
        />
        <ScriptCard articleDes={desParticle} link={"/scriptorium/particle"} />

        <ScriptCard
          articleDes={desMappingFullstack}
          link={"/scriptorium/mapping-fullstack"}
        />
      </div>
    </div>
  );
}

export default Scriptorium;
