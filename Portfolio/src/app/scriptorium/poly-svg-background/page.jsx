import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Building a Mouse-Responsive SVG Polygon Background",
  description: `This article will go over how to transform a static SVG image into a cool mouse responsive background! Use's
  include portfolios, interactive websites, or even in more professional settings if you're feeling like creating something interesting.
  Built with css and javascript.`,
};

const polySvgArticle = fs.readFileSync(
  path.join(process.cwd(), "src/views/scriptorium/articles/polySvgArticle.md"),
  "utf8"
);

function ScriptoriumPage() {
  return <SubjectContainer article={[polySvgArticle]} />;
}

export default ScriptoriumPage;
