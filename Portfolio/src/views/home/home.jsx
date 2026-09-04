import Hero from "./hero/hero";
import Highlight from "./highlight/highlight";
import About from "./about/about";
import Skills from "./skills/skills";
import Divider from "./divider/divider";
import Who from "./who/who";

function Home() {
  return (
    <>
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
