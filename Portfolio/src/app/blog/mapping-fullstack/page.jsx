export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Mapping A full stack application",
  description: `A detailed article mapping out a full stack web application, ideal for beginner to intermediate developers. 
  Show's the interworkings of serving code, authentication, and common operations, covering key concepts like JWT, cookies, CORS, and API calls.
  Including diagrams to illustrate the flow of data and interactions within the application.`,

  openGraph: {
    title: "Mapping A full stack application",
    description:
      "A detailed article mapping out a full stack web application...",
    url: "https://www.kadenwildauer.com/scriptorium/mapping-fullstack",
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
    title: "Mapping A full stack application",
    description:
      "A detailed article mapping out a full stack web application...",
    images: ["/scriptorium/mapArticle/Map3.png"],
  },
  robots: "index, follow",
};
import { SubjectContainer } from "@/views/blog/posts/postReader";
import mappingArticle from "@/views/blog/posts/content/articlesText/mappingArticle/map.md";
import { desMappingFullstack } from "@/views/blog/posts/content/articleDes";

function ScriptoriumPage() {
  return (
    <SubjectContainer
      article={[mappingArticle]}
      description={desMappingFullstack}
    />
  );
}

export default ScriptoriumPage;
