export const metadata = {
  title: "A particle system introduction",
  description: `A basic introduction to particle systems and their implementation. Goes through integral concepts such as emission, movement, rendering, mathematics and physics. 
    Mainly goes over vectors and how to manipulate them with formulas. Includes code snippets and direct examples of implementation in motion.`,
};

import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import { markdown } from "@/views/scriptorium/articles/article1.js";
import ParticleSys from "@/views/scriptorium/scripts/particleSys.jsx";
const articleArr = [markdown, ParticleSys];

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} />;
}

export default ScriptoriumPage;
