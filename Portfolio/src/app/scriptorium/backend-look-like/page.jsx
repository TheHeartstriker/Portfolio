export const metadata = {
  title: "What a backend looks like Javascript, Express and Node",
  description: `This article goes over the backend. What a simple backends looks like, what the code may look like, file strctures, database integration, and how it all ties in with the frontend. This is aimed at beginner to lower-intermediate web developers looking to understand the backend.`,
  openGraph: {
    title: "What a backend looks like Javascript, Express and Node",
    description: "This article goes over the backend...",
    url: "https://kadenwildauer.com/scriptorium/backend-look-like",
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
import { SubjectContainer } from "../../../components/scriptorium/mainArticle/index.jsx";
import backendArticle from "@/views/scriptorium/articles/backendLookArticle/backend.md";

function ScriptoriumPage() {
  return <SubjectContainer article={[backendArticle]} />;
}

export default ScriptoriumPage;
