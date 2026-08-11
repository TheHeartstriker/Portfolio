import Hero from "./hero/hero";
import Highlight from "./highlight/highlight";
import LayoutGuide from "@/utils/alignment/align";
import About from "./about/about";
import Skills from "./skills/skills";

function Home() {
  return (
    <>
      <Hero />
      <Highlight />
      <About />
      <Skills />
    </>
  );
}

export default Home;
