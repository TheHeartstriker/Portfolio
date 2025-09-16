export const metadata = {
  title: "Particle systems",
  description: `A basic introduction to creative coding through particle systems. Learn how to use logic, math, 
  and programming to simulate natural phenomena like lightning, fire, and wind. 
  Perfect for practicing fundamentals and enhancing problem-solving skills with real-time results.`,
};
import fs from "fs";
import path from "path";
import { SubjectContainer } from "../../../components/scriptorium/index.jsx";

const particleArticle = fs.readFileSync(
  path.join(
    process.cwd(),
    "src/views/scriptorium/articles/particleArticle/particle.md"
  ),
  "utf8"
);

import ParticleSys from "@/views/scriptorium/scripts/particleSys.jsx";
const articleArr = [particleArticle, ParticleSys];

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} />;
}

export default ScriptoriumPage;
