import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
import hoverArticle from "@/views/scriptorium/articles/hover-cards/hoverArticle.md";
import Cards from "@/views/scriptorium/scripts/hover-card/card-hover.jsx";

function ScriptoriumPage() {
  return (
    <SubjectContainer article={[hoverArticle, Cards]} description={null} />
  );
}

export default ScriptoriumPage;
