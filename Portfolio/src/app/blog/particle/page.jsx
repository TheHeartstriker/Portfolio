export const metadata = {
  //
  // Base / web / chrome
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Particle systems",
  description: `A basic introduction to creative coding through particle systems. Learn how to use logic, math, 
  and programming to simulate natural phenomena like lightning, fire, and wind. 
  Perfect for practicing fundamentals and enhancing problem-solving skills with real-time results.`,
  //
  // Open Graph
  openGraph: {
    title: "Particle systems",
    description:
      "A basic introduction to creative coding through particle systems...",
    url: "https://www.kadenwildauer.com/blog/particle",
    images: [
      {
        url: "/blog/thumb/thumb1.webp",
        width: 1200,
        height: 630,
        alt: "Particle Systems Example",
      },
    ],
  },
  //
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Particle systems",
    description:
      "A basic introduction to creative coding through particle systems...",
    images: ["/blog/thumb/thumb1.webp"],
  },
  robots: "index, follow",
};
import { ArticleReader } from "@/views/blog/posts/postReader/render";
import particleArticle from "@/views/blog/posts/content/articlesText/particleArticle/particle.md";
import ParticleSys from "@/views/blog/posts/content/articlesScript/particleSys";

const articleArr = [particleArticle, ParticleSys];

function BlogPage() {
  return <ArticleReader article={articleArr} />;
}

export default BlogPage;
