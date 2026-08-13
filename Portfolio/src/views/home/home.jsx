import Hero from "./hero/hero";
import Highlight from "./highlight/highlight";
import LayoutGuide from "@/utils/alignment/align";
import About from "./about/about";
import Skills from "./skills/skills";
import Divider from "./divider/divider";
import Who from "./who/who";

function Home() {
  return (
    <>
      {/* <LayoutGuide /> */}
      <Hero />
      <Highlight />
      <About />
      <Divider />
      <Who />
      <Skills />
    </>
  );
}

export default Home;
