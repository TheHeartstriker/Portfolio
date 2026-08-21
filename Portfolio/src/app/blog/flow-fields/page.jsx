export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Flow Fields, painting with math",
  description: `An introduction to flow fields a concept used in computer graphics, generative art, and fluid mechanics.
  This article features clear explanations, diagrams, and a live example to illustrate the concept.
  By the end, you'll hopefully have your own flow field to experiment with and a deeper understanding of how it works.`,

  openGraph: {
    title: "Flow Fields, painting with math",
    description:
      "An introduction to flow fields a concept used in computer graphics...",
    url: "https://www.kadenwildauer.com/scriptorium/flow-fields",
    images: [
      {
        url: "/scriptorium/thumb/thumb3.webp",
        width: 1200,
        height: 630,
        alt: "Flow Fields Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow Fields, painting with math",
    description:
      "An introduction to flow fields a concept used in computer graphics...",
    images: ["/scriptorium/thumb/thumb3.webp"],
  },
  robots: "index, follow",
};
import { SubjectContainer } from "../../../views/scriptorium/articlesReader/mainArticle/index.jsx";
import { desFlowField } from "@/views/scriptorium/articlesContent/articleDes.js";

import flowArticle1 from "@/views/scriptorium/articlesContent/articlesText/flowFields/flow1.md";
import flowArticle2 from "@/views/scriptorium/articlesContent/articlesText/flowFields/flow2.md";
import FlowField from "@/views/scriptorium/articlesContent/articlesScript/flowField/flowField.jsx";

function ScriptoriumPage() {
  return (
    <SubjectContainer
      article={[flowArticle1, FlowField, flowArticle2]}
      description={desFlowField}
    />
  );
}

export default ScriptoriumPage;
