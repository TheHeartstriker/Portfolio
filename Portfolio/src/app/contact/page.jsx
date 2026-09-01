const title = "Kaden Wildauer — Contact";
const description = `My name is Kaden Wildauer and I am a digital creative. Explore how to reach out and connect or brief me directly.`;

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
    url: "https://www.kadenwildauer.com/contact",
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
    canonical: "https://www.kadenwildauer.com/contact",
  },
};
import Contact from "@/views/contact/contact";

function ContactPage() {
  return <Contact />;
}

export default ContactPage;
