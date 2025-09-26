export const metadata = {
  title: "Unknown",
  description: `Unknown`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import flowArticle1 from "@/views/scriptorium/articles/flowFields/flow1.md";
import flowArticle2 from "@/views/scriptorium/articles/flowFields/flow2.md";
import FlowField from "@/views/scriptorium/scripts/flowField/flowField.jsx";

function ScriptoriumPage() {
  return <SubjectContainer article={[flowArticle1, FlowField, flowArticle2]} />;
}

export default ScriptoriumPage;
