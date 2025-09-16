export const metadata = {
  title: "Mapping A full stack application",
  description: `A detailed article mapping out a full stack web application, ideal for beginner to intermediate developers. 
  Show's the interworkings of serving code, authentication, and common operations, covering key concepts like JWT, cookies, CORS, and API calls.
  Including diagrams to illustrate the flow of data and interactions within the application.`,
};
import fs from "fs";
import path from "path";
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";

const mappingArticle = fs.readFileSync(
  path.join(
    process.cwd(),
    "src/views/scriptorium/articles/mappingArticle/map.md"
  ),
  "utf8"
);

function ScriptoriumPage() {
  return <SubjectContainer article={[mappingArticle]} />;
}

export default ScriptoriumPage;
