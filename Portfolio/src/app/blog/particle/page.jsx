export const metadata = {
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title: "Particle systems",
  description: `A basic introduction to creative coding through particle systems. Learn how to use logic, math, 
  and programming to simulate natural phenomena like lightning, fire, and wind. 
  Perfect for practicing fundamentals and enhancing problem-solving skills with real-time results.`,

  openGraph: {
    title: "Particle systems",
    description:
      "A basic introduction to creative coding through particle systems...",
    url: "https://www.kadenwildauer.com/scriptorium/particle",
    images: [
      {
        url: "/scriptorium/thumb/thumb1.webp",
        width: 1200,
        height: 630,
        alt: "Particle Systems Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Particle systems",
    description:
      "A basic introduction to creative coding through particle systems...",
    images: ["/scriptorium/thumb/thumb1.webp"],
  },
  robots: "index, follow",
};
import { SubjectContainer } from "@/views/blog/posts/postReader";
import particleArticle from "@/views/blog/posts/content/articlesText/particleArticle/particle.md";
import ParticleSys from "@/views/blog/posts/content/articlesScript/particleSys";

const articleArr = [particleArticle, ParticleSys];
import { desParticle } from "@/views/blog/posts/content/articleDes";

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} description={desParticle} />;
}

export default ScriptoriumPage;
