const title = "Kaden Wildauer — The digital creative";
const description =
  "My name is Kaden Wildauer and I am a digital creative. I build immersive websites for small brands and individuals. The person people come to when quality, excellence and effort matter.";

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
    url: "https://www.kadenwildauer.com/",
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
    canonical: "https://www.kadenwildauer.com/",
  },
};

import Home from "@/views/home/home.jsx";
function Index() {
  return <Home />;
}
export default Index;
