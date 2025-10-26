import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
import hoverArticle from "@/views/scriptorium/articles/hover-cards/hoverArticle.md";

function ScriptoriumPage() {
  return <SubjectContainer article={[hoverArticle]} description={null} />;
}

export default ScriptoriumPage;
