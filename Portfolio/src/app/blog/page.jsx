const title = "Kaden Wildauer — Blog";
const description = `My name is Kaden Wildauer and I am a digital creative. Explore my blog for my thoughts and ideas on all things creative and digital.
`;

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
    url: "https://www.kadenwildauer.com/blog",
    images: [
      {
        url: "/doc/main.webp",
        width: 1200,
        height: 630,
        alt: "Kaden Wildauer Blog",
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
    canonical: "https://www.kadenwildauer.com/blog",
  },
};
import Blog from "@/views/blog/blog";
function BlogPage() {
  return <Blog />;
}

export default BlogPage;
