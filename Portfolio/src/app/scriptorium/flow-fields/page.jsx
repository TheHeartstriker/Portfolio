export const metadata = {
  title: "Unknown",
  description: `Unknown`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import flowArticle from "@/views/scriptorium/articles/flowFields/flow.md";
import FlowField from "@/views/scriptorium/scripts/flowField/flowField.jsx";

function ScriptoriumPage() {
  return <SubjectContainer article={[flowArticle, FlowField]} />;
}

export default ScriptoriumPage;
