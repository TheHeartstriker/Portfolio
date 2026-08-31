import Hero from "./hero/hero";
import Work from "./work/work";
import Process from "./process/process";
import LayoutGuide from "@/utils/alignment/align";
import Journey from "./journey/journey";
import FAQ from "./faq/faq";
function Portfolio() {
  return (
    <>
      {/* <LayoutGuide /> */}
      <Hero />
      <Work />
      <Process />
      <Journey />
      <FAQ />
    </>
  );
}

export default Portfolio;
