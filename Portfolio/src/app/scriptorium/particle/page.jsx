export const metadata = {
  title: "Particle systems",
  description: `A basic introduction to creative coding through particle systems. Learn how to use logic, math, 
  and programming to simulate natural phenomena like lightning, fire, and wind. 
  Perfect for practicing fundamentals and enhancing problem-solving skills with real-time results.`,
};
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";

import particleArticle from "@/views/scriptorium/articles/particleArticle/particle.md";
import ParticleSys from "@/views/scriptorium/scripts/particleSys.jsx";

const articleArr = [particleArticle, ParticleSys];

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} />;
}

export default ScriptoriumPage;
