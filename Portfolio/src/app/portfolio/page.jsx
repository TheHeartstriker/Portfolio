const title = "Kaden Wildauer — Portfolio";
const description = `My name is Kaden Wildauer and I am a digital creative. Explore my work, vision, process, and what I strive for in every project.`;

export const metadata = {
  //
  // Base / web / chrome
  metadataBase: new URL("https://www.kadenwildauer.com/"),
  title,
  description,
  //
  // Open Graph
  openGraph: {
    title,
    description,
    url: "https://www.kadenwildauer.com/portfolio",
    images: [
      {
        url: "/doc/main.webp",
        width: 1200,
        height: 630,
        alt: "Kaden Wildauer Portfolio",
      },
    ],
  },
  //
  // Twitter
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/doc/main.webp"],
  },
  //
  // Roots / defaults
  robots: "index, follow",
  alternates: {
    canonical: "https://www.kadenwildauer.com/portfolio",
  },
};

import Portfolio from "@/views/portfolio/portfolio";
function Index() {
  return <Portfolio />;
}

export default Index;
