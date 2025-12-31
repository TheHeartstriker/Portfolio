import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
} from "./articles/articleDes.js";
import { ScriptCard } from "../../components/forViews/scriptorium/scriptCard.jsx";
import PillAnimation from "@/components/forStyle/animations/pillAnimation.jsx";

import "./scriptorium.css";

function Scriptorium() {
  const tags = [".script-article-tags span"];
  return (
    <div className="main-scriptorium-container">
      <PillAnimation tags={tags} />
      <div className="article-card-container">
        <ScriptCard
          articleDes={desHoverCards}
          link={"/scriptorium/hover-cards"}
        />
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
