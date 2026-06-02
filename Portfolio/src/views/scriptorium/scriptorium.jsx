import "./scriptorium.css";
import Intro from "./sections/intro/intro";
import Recent from "./sections/recent/recent";
import Articles from "./sections/articles/articles";
function Scriptorium() {
  return (
    <div className="main-scriptorium-container">
      <Intro />
      <Recent />
      <Articles />
    </div>
  );
}

export default Scriptorium;
