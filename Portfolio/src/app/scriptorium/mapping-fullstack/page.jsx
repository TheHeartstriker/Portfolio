export const metadata = {
  title: "A Full stack introduction",
  description: `A basic introduction to fullstack development by mapping out and explaining a simple website. Goes over key stages such as serving, DNS, TCP, HTTP, JWT, Cookies, and more. Includes visual examples.
  And simplifies complex concepts into digestible pieces.`,
};

import { SubjectContainer } from "../../../components/scriptorium/index.jsx";
import { markdown } from "@/views/scriptorium/articles/article1.js";
const art1Image = "/scriptorium/Map1.png";
const art2Image = "/scriptorium/Map2.png";
const art3Image = "/scriptorium/Map3.png";

import {
  articleMappingFullStack1,
  articleMappingFullStack2,
  articleMappingFullStack3,
  articleMappingFullStack4,
} from "@/views/scriptorium/articles/article2.js";

const articleArr = [
  articleMappingFullStack1,
  art1Image,
  articleMappingFullStack2,
  art2Image,
  articleMappingFullStack3,
  art3Image,
  articleMappingFullStack4,
];

function ScriptoriumPage() {
  return <SubjectContainer article={articleArr} />;
}

export default ScriptoriumPage;
