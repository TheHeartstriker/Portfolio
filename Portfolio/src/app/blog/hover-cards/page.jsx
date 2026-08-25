export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Modern Card Hover Animations, Css and Javascript",
  description: `A tutorial on creating three interesting and interactive card hover effects using CSS and Javascript. 
  Including code examples, imagery, extensive descriptions, and a live demo.`,

  openGraph: {
    title: "Modern Card Hover Animations, Css and Javascript",
    description:
      "A tutorial on creating three interesting and interactive card hover effects using CSS and Javascript.",
    url: "https://www.kadenwildauer.com/scriptorium/hover-cards",
    images: [
      {
        url: "/scriptorium/thumb/CardThumb.webp",
        width: 1200,
        height: 630,
        alt: "Modern Card Hover Animations Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Card Hover Animations, Css and Javascript",
    description:
      "A tutorial on creating three interesting and interactive card hover effects using CSS and Javascript.",
    images: ["/scriptorium/thumb/CardThumb.webp"],
  },
  robots: "index, follow",
};

import { ArticleReader } from "@/views/blog/posts/postReader/render";
import hoverArticle1 from "@/views/blog/posts/content/articlesText/hover-cards/hoverArticle.md";
import hoverArticle2 from "@/views/blog/posts/content/articlesText/hover-cards/hoverArticle2.md";
import Cards from "@/views/blog/posts/content/articlesScript/hover-card/card-hover";

function ScriptoriumPage() {
  return <ArticleReader article={[hoverArticle1, Cards, hoverArticle2]} />;
}

export default ScriptoriumPage;
