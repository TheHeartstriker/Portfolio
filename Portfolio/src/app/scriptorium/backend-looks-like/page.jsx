export const metadata = {
  tile: "None",
  description: "None",
};
import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
import backendArticle from "@/views/scriptorium/articles/backendLookArticle/backend.md";

function ScriptoriumPage() {
  return <SubjectContainer article={[backendArticle]} />;
}

export default ScriptoriumPage;
