export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "What a backend looks like Javascript, Express and Node",
  description: `This article goes over the backend. What a simple backends looks like, what the code may look like, file strctures, database integration, and how it all ties in with the frontend. This is aimed at beginner to lower-intermediate web developers looking to understand the backend.`,
  openGraph: {
    title: "What a backend looks like Javascript, Express and Node",
    description: "This article goes over the backend...",
    url: "https://www.kadenwildauer.com/scriptorium/backend-look-like",
    images: [
      {
        url: "/scriptorium/thumb/thumb4.webp",
        width: 1200,
        height: 630,
        alt: "Backend Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What a backend looks like Javascript, Express and Node",
    description: "This article goes over the backend...",
    images: ["/scriptorium/thumb/thumb4.webp"],
  },
  robots: "index, follow",
};
import { ArticleReader } from "@/views/blog/posts/postReader/render";
import backendArticle from "@/views/blog/posts/content/articlesText/backendLookArticle/backend.md";

function ScriptoriumPage() {
  return <ArticleReader article={[backendArticle]} />;
}

export default ScriptoriumPage;
