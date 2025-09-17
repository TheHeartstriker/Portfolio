import AboutMobile from "./aboutMobile";
import {
  Header1,
  Header2,
  Header3,
  MainText1,
  MainText2,
  MainText3,
} from "./text";

function About() {
  return (
    <div className="main-about-container">
      <div className="i-am-container">
        <h1 className="text-1">Hi, my name is</h1>
        <h2 className="text-2">Kaden Wildauer.</h2>
        <h3 className="text-3">I build things for the web!</h3>
        <p className="text-4">
          I&apos;m a software engineer specializing in building websites and web
          applications. I enjoy creating efficient, scalable, and visually
          appealing digital experiences. You can find my work here!
        </p>
      </div>
      {/* Client-side logic below */}
      <AboutMobile
        Header1={Header1}
        Header2={Header2}
        Header3={Header3}
        MainText1={MainText1}
        MainText2={MainText2}
        MainText3={MainText3}
      />
    </div>
  );
}

export default About;
