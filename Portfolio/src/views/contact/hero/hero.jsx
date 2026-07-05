import { TextScramble } from "@/utils/animations/scramble.jsx";
import { useState, useRef } from "react";
import "./hero.css";
import { introText } from "../text.js";
import HeroAni from "./heroAni.jsx";

function Hero() {
  const EMAIL = "kaden@kadenwildauer.com";
  const COPIED = "Copied to clipboard!";
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  const [emailText, setEmailText] = useState(EMAIL);
  const canClick = useRef(true);

  function handleEmailClick() {
    if (!canClick.current) return;
    canClick.current = false;
    navigator.clipboard.writeText(EMAIL);
    // Scramble email → COPIED (pad to same length so index doesn't go out of bounds)
    TextScramble(
      COPIED.padEnd(EMAIL.length, " "),
      EMAIL,
      ALPHABET,
      setEmailText,
      1,
    );
    // Clean up trailing spaces once scramble finishes (~26 steps × 40ms)
    setTimeout(() => setEmailText(COPIED), 1100);
    // After a pause, scramble back to email
    setTimeout(() => {
      TextScramble(EMAIL, EMAIL, ALPHABET, setEmailText, 1);
      setTimeout(() => {
        canClick.current = true;
      }, 1100);
    }, 2500);
  }

  return (
    <div className="contact-intro">
      <HeroAni />
      <div className="contact-intro-left">
        <h2 id="test1">Get in</h2>
        <h2 id="test2">Touch</h2>

        <div className="contact-intro-left-email" onClick={handleEmailClick}>
          <h3>{emailText}</h3>
        </div>
      </div>
      <div className="contact-intro-right">
        <h3>{introText.rightHeader}</h3>
        <div className="contact-intro-right-text">
          <p>{introText.rightPara}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
