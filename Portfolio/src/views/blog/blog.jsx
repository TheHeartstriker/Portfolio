import Hero from "./hero/hero";
import LayoutGuide from "@/utils/alignment/align";
import Highlight from "./highlight/highlight";
import Posts from "./posts/posts";

function Blog() {
  return (
    <>
      <LayoutGuide />
      <Hero />
      <Highlight />
      <Posts />
    </>
  );
}

export default Blog;
