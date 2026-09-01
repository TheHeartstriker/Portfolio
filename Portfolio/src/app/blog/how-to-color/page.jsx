export const metadata = {
  //
  // Base / web / chrome
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "How to Choose Colors When Designing a Website",
  description: `A detailed article about how to choose colors when designing a website, covering design principles, color theory, and practical tips. Along with examples and when and how to apply them.`,
  //
  // Open Graph
  openGraph: {
    title: "How to Choose Colors When Designing a Website",
    description:
      "A detailed article about how to choose colors when designing a website...",
    url: "https://www.kadenwildauer.com/blog/how-to-color",
    images: [
      {
        url: "/blog/thumb/thumb5.webp",
        width: 1200,
        height: 630,
        alt: "How to Choose Colors When Designing a Website",
      },
    ],
  },
  //
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "How to Choose Colors When Designing a Website",
    description:
      "A detailed article about how to choose colors when designing a website...",
    images: ["/blog/thumb/thumb5.webp"],
  },
  robots: "index, follow",
};
import { ArticleReader } from "@/views/blog/posts/postReader/render";
import colorArticle from "@/views/blog/posts/content/articlesText/colorArticle/color.md";
function BlogPage() {
  return <ArticleReader article={[colorArticle]} />;
}

export default BlogPage;
