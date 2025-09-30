import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
export const metadata = {
  title: "Building a Mouse-Responsive SVG Polygon Background",
  description: `This article will go over how to transform a static SVG image into a cool mouse responsive background! Use's
  include portfolios, interactive websites, or even in more professional settings if you're feeling like creating something interesting.
  Built with css and javascript.`,
};

import polySvgArticle1 from "@/views/scriptorium/articles/polyArticle/polySvgArticle1.md";
import polySvgArticle2 from "@/views/scriptorium/articles/polyArticle/polySvgArticle2.md";
import App from "@/views/scriptorium/scripts/polySvg.jsx";

const articleArr = [polySvgArticle1, App, polySvgArticle2];

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} />;
}

export default ScriptoriumPage;
