import { ArticleReader } from "@/views/blog/posts/postReader/render";
export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Building a Mouse-Responsive SVG Polygon Background",
  description: `This article will go over how to transform a static SVG image into a cool mouse responsive background! Use's
  include portfolios, interactive websites, or even in more professional settings if you're feeling like creating something interesting.
  Built with css and javascript.`,

  openGraph: {
    title: "Building a Mouse-Responsive SVG Polygon Background",
    description:
      "This article will go over how to transform a static SVG image into a cool mouse responsive background...",
    url: "https://www.kadenwildauer.com/scriptorium/poly-svg-background",
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

import polySvgArticle1 from "@/views/blog/posts/content/articlesText/polyArticle/polySvgArticle1.md";
import polySvgArticle2 from "@/views/blog/posts/content/articlesText/polyArticle/polySvgArticle1.md";
import App from "@/views/blog/posts/content/articlesScript/polySvg";

const articleArr = [polySvgArticle1, App, polySvgArticle2];

function ScriptoriumPage() {
  return <ArticleReader article={articleArr} />;
}

export default ScriptoriumPage;
