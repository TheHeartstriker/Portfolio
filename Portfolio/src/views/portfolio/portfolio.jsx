import Hero from "./hero/hero";
import Work from "./work/work";
import Process from "./process/process";
import Journey from "./journey/journey";
import FAQ from "./faq/faq";
import LayoutGuide from "@/utils/alignment/align";
import NewWork from "./newWork/work";
function Portfolio() {
  return (
    <>
      <Hero />
      <NewWork />
      {/* <Work /> */}
      <Process />
      <Journey />
      <FAQ />
    </>
  );
}

export default Portfolio;
