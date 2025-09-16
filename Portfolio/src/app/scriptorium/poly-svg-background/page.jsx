import { desPolySVG } from "@/views/scriptorium/articles/articleDes.js";
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import fs from "fs";
import path from "path";

export const metadata = {
  title: desPolySVG.title + " | Kaden Wildauer ",
  description: desPolySVG.des,
};

const polySvgArticle = fs.readFileSync(
  path.join(process.cwd(), "src/views/scriptorium/articles/polySvgArticle.md"),
  "utf8"
);

function ScriptoriumPage() {
  return <SubjectContainer article={[polySvgArticle]} />;
}

export default ScriptoriumPage;
