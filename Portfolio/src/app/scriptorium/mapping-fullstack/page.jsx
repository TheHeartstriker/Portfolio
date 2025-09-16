export const metadata = {
  title: "A Full stack introduction",
  description: `A basic introduction to fullstack development by mapping out and explaining a simple website. Goes over key stages such as serving, DNS, TCP, HTTP, JWT, Cookies, and more. Includes visual examples.
  And simplifies complex concepts into digestible pieces.`,
};

import { SubjectContainer } from "../../../components/scriptorium/index.jsx";

import { articleMappingFullStack } from "@/views/scriptorium/articles/article2.js";

function ScriptoriumPage() {
  return <SubjectContainer article={[articleMappingFullStack]} />;
}

export default ScriptoriumPage;
