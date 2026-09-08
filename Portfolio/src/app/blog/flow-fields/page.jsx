export const metadata = {
  //
  // Base / web / chrome
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Flow Fields, painting with math",
  description: `An introduction to flow fields a concept used in computer graphics, generative art, and fluid mechanics.
  This article features clear explanations, diagrams, and a live example to illustrate the concept.
  By the end, you'll hopefully have your own flow field to experiment with and a deeper understanding of how it works.`,
  //
  // Open Graph
  openGraph: {
    title: "Flow Fields, painting with math",
    description:
      "An introduction to flow fields a concept used in computer graphics...",
    url: "https://www.kadenwildauer.com/blog/flow-fields",
    images: [
      {
        url: "/blog/thumb/thumb3.webp",
        width: 1200,
        height: 630,
        alt: "Flow Fields Example",
      },
    ],
  },
  //
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Flow Fields, painting with math",
    description:
      "An introduction to flow fields a concept used in computer graphics...",
    images: ["/blog/thumb/thumb3.webp"],
  },
  robots: "index, follow",
};
import { ArticleReader } from "@/views/blog/posts/postReader/render";

import flowArticle1 from "@/views/blog/posts/content/articlesText/flowFields/flow1.md";
import flowArticle2 from "@/views/blog/posts/content/articlesText/flowFields/flow2.md";
import FlowField from "@/views/blog/posts/content/articlesScript/flowField/flowField";

function BlogPage() {
  return <ArticleReader article={[flowArticle1, FlowField, flowArticle2]} />;
}

export default BlogPage;
