export const metadata = {
  metadataBase: new URL("https://kadenwildauer.com"),
  title: "Kaden Wildauer | Full-Stack Developer",
  description:
    "Explore my portfolio as a web developer, freelancer, and software engineer. Discover my projects, skills, coding playgrounds, and creative experiments in web development and software engineering.",

  openGraph: {
    title: "Kaden Wildauer | Full-Stack Developer",
    description:
      "Explore my portfolio as a web developer, freelancer, and software engineer. Discover my projects, skills, coding playgrounds, and creative experiments in web development and software engineering.",
    images: [
      {
        url: "/mainThumb.webp",
        width: 1200,
        height: 630,
        alt: "Kaden Wildauer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaden Wildauer | Full-Stack Developer",
    description:
      "Explore my portfolio as a web developer, freelancer, and software engineer. Discover my projects, skills, coding playgrounds, and creative experiments in web development and software engineering.",
    images: ["/mainThumb.webp"],
  },
  robots: "index, follow",
};

import About from "../views/about/about.jsx";
function Index() {
  return <About />;
}
export default Index;
