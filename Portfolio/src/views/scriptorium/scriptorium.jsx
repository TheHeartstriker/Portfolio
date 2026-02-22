"use client";
import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./articles/articleDes.js";
import TimeSharp from "../../../public/icons/time-sharp.jsx";
import { ScriptCard } from "../../components/forViews/scriptorium/scriptCard.jsx";
import PillAnimation from "@/components/forStyle/animations/pillAnimation.jsx";
import ScriptoriumIntroCat from "./scriptoriumIntroCat.jsx";
import Masonry from "react-masonry-css";
import "./scriptoriumIntroCat.css";
import "./scriptorium.css";

function Scriptorium() {
  const tags = [".script-article-tags span"];
  return (
    <>
      <div className="main-scriptorium-container">
        <ScriptoriumIntroCat />
        <PillAnimation tags={tags} />
        <div className="article-container">
          <h2>Articles</h2>
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

            <div className="article-filter-container">
              <h3>Search filter's</h3>
              <Masonry className="article-filter-search-container"></Masonry>
            </div>

            <ScriptCard
              articleDes={desPolySVG}
              link={"/scriptorium/poly-svg-background"}
            />
            <ScriptCard
              articleDes={desParticle}
              link={"/scriptorium/particle"}
            />

            <ScriptCard
              articleDes={desMappingFullstack}
              link={"/scriptorium/mapping-fullstack"}
            />
            <ScriptCard
              articleDes={desColor}
              link={"/scriptorium/how-to-color"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Scriptorium;
