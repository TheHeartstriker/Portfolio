export const metadata = {
  //
  // Base / web / chrome
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Mapping A full stack application",
  description: `A detailed article mapping out a full stack web application, ideal for beginner to intermediate developers. 
  Show's the interworkings of serving code, authentication, and common operations, covering key concepts like JWT, cookies, CORS, and API calls.
  Including diagrams to illustrate the flow of data and interactions within the application.`,
  //
  // Open Graph
  openGraph: {
    title: "Mapping A full stack application",
    description:
      "A detailed article mapping out a full stack web application...",
    url: "https://www.kadenwildauer.com/blog/mapping-fullstack",
    images: [
      {
        url: "/blog/mapArticle/Map3.png",
        width: 1200,
        height: 630,
        alt: "Mapping Fullstack Example",
      },
    ],
  },
  //
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Mapping A full stack application",
    description:
      "A detailed article mapping out a full stack web application...",
    images: ["/blog/mapArticle/Map3.png"],
  },
  robots: "index, follow",
};
import { ArticleReader } from "@/views/blog/posts/postReader/render";
import mappingArticle from "@/views/blog/posts/content/articlesText/mappingArticle/map.md";

function BlogPage() {
  return <ArticleReader article={[mappingArticle]} />;
}

export default BlogPage;
