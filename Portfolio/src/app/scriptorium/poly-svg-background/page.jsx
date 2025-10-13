import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
export const metadata = {
  title: "Building a Mouse-Responsive SVG Polygon Background",
  description: `This article will go over how to transform a static SVG image into a cool mouse responsive background! Use's
  include portfolios, interactive websites, or even in more professional settings if you're feeling like creating something interesting.
  Built with css and javascript.`,
  metadataBase: new URL("https://kadenwildauer.com"),

  openGraph: {
    title: "Building a Mouse-Responsive SVG Polygon Background",
    description:
      "This article will go over how to transform a static SVG image into a cool mouse responsive background...",
    url: "https://kadenwildauer.com/scriptorium/poly-svg-background",
    images: [
      {
        url: "/scriptorium/polySvgArticle/PolyWhiteBlackBlack.webp",
        width: 1200,
        height: 630,
        alt: "Mouse-Responsive SVG Polygon Background Example",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Building a Mouse-Responsive SVG Polygon Background",
    description:
      "This article will go over how to transform a static SVG image into a cool mouse responsive background...",
    images: ["/scriptorium/polySvgArticle/PolyWhiteBlackBlack.webp"],
  },
  robots: "index, follow",
};

import polySvgArticle1 from "@/views/scriptorium/articles/polyArticle/polySvgArticle1.md";
import polySvgArticle2 from "@/views/scriptorium/articles/polyArticle/polySvgArticle2.md";
import App from "@/views/scriptorium/scripts/polySvg.jsx";

const articleArr = [polySvgArticle1, App, polySvgArticle2];
import { desPolySVG } from "@/views/scriptorium/articles/articleDes.js";

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} description={desPolySVG} />;
}

export default ScriptoriumPage;
