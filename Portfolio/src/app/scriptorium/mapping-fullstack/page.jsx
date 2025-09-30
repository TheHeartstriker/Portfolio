export const metadata = {
  title: "Mapping A full stack application",
  description: `A detailed article mapping out a full stack web application, ideal for beginner to intermediate developers. 
  Show's the interworkings of serving code, authentication, and common operations, covering key concepts like JWT, cookies, CORS, and API calls.
  Including diagrams to illustrate the flow of data and interactions within the application.`,
};
import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
import mappingArticle from "@/views/scriptorium/articles/mappingArticle/map.md";
import { desMappingFullstack } from "@/views/scriptorium/articles/articleDes.js";

function ScriptoriumPage() {
  return (
    <SubjectContainer
      article={[mappingArticle]}
      description={desMappingFullstack}
    />
  );
}

export default ScriptoriumPage;
