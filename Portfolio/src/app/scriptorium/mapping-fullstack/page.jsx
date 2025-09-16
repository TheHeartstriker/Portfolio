export const metadata = {
  title: "Mapping A full stack application",
  description: `A detailed article mapping out a full stack web application, ideal for beginner to intermediate developers. 
  Show's the interworkings of serving code, authentication, and common operations, covering key concepts like JWT, cookies, CORS, and API calls.
  Including diagrams to illustrate the flow of data and interactions within the application.`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import mappingArticle from "@/views/scriptorium/articles/mappingArticle/map.md";

function ScriptoriumPage() {
  return <SubjectContainer article={[mappingArticle]} />;
}

export default ScriptoriumPage;
