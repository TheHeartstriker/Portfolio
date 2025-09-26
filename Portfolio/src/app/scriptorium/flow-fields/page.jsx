export const metadata = {
  title: "Flow Fields, painting with math",
  description: `An introduction to flow fields a concept used in computer graphics, generative art, and fluid mechanics.
  This article features clear explanations, diagrams, and a live example to illustrate the concept.
  By the end, you'll hopefully have your own flow field to experiment with and a deeper understanding of how it works.`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import flowArticle1 from "@/views/scriptorium/articles/flowFields/flow1.md";
import flowArticle2 from "@/views/scriptorium/articles/flowFields/flow2.md";
import FlowField from "@/views/scriptorium/scripts/flowField/flowField.jsx";

function ScriptoriumPage() {
  return <SubjectContainer article={[flowArticle1, FlowField, flowArticle2]} />;
}

export default ScriptoriumPage;
