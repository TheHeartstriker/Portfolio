export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "How to Choose Color When Designing a Website",
  description: `A detailed article about how to choose colors when designing a website, covering design principles, color theory, and practical tips. Along with examples and when and how to apply them.`,

  openGraph: {
    title: "How to Choose Color When Designing a Website",
    description:
      "A detailed article about how to choose colors when designing a website...",
    url: "https://www.kadenwildauer.com/scriptorium/how-to-color",
    images: [
      {
        url: "/scriptorium/mapArticle/Map3.png",
        width: 1200,
        height: 630,
        alt: "Mapping Fullstack Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Choose Color When Designing a Website",
    description:
      "A detailed article about how to choose colors when designing a website...",
    images: ["/scriptorium/mapArticle/Map3.png"],
  },
  robots: "index, follow",
};
import { SubjectContainer } from "../../../components/forViews/scriptorium/mainArticle/index.jsx";
import colorArticle from "@/views/scriptorium/articles/colorArticle/color.md";
import { desColor } from "@/views/scriptorium/articles/articleDes.js";

function ScriptoriumPage() {
  return <SubjectContainer article={[colorArticle]} description={desColor} />;
}

export default ScriptoriumPage;
