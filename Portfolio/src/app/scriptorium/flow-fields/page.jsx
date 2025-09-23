export const metadata = {
  title: "Unknown",
  description: `Unknown`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import flowArticle from "@/views/scriptorium/articles/flowFields/flow.md";

function ScriptoriumPage() {
  return <SubjectContainer article={[flowArticle]} />;
}

export default ScriptoriumPage;
