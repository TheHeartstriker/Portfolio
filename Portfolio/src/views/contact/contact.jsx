"use client";
import "./contact.css";
import { Separator } from "@/components/separator/separator.jsx";
import { useState, useRef } from "react";
import ContactAnimation from "./contactAnimation.jsx";
import { introText, faq } from "./text.js";
import { TextScramble } from "@/utils/animations/scramble.jsx";
function Contact() {
  const [active, setActive] = useState(1);
  const EMAIL = "serkadenwildauer@gmail.com";
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
    <>
      <ContactAnimation />
      <div className="contact">
        {/*  */}
        {/* Contact intro */}
        {/*  */}
        <div className="contact-intro">
          <div className="contact-intro-left">
            <h2 id="test1">Get in</h2>
            <h2 id="test2">Touch</h2>

            <div
              className="contact-intro-left-email"
              onClick={handleEmailClick}
            >
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
        {/*  */}
        {/* Contact intro */}
        {/*  */}
        <div className="contact-faq">
          <Separator
            headerArr={["Questions", "Frequently Asked"]}
            reverse={false}
          />
          <div className="contact-faq-container">
            {/* Item1 */}
            <div
              className={`contact-faq-container-item ${active === 1 ? "active" : ""}`}
              onMouseEnter={() => setActive(1)}
            >
              <div
                className={`contact-faq-container-item-text ${active === 1 ? "active" : ""}`}
              >
                <h3>{faq.faq1.header}</h3>
                <p>{faq.faq1.para}</p>
              </div>
              <h4>01.</h4>
            </div>
            {/* Item1 */}
            <div
              className={`contact-faq-container-item ${active === 2 ? "active" : ""}`}
              onMouseEnter={() => setActive(2)}
            >
              <div
                className={`contact-faq-container-item-text ${active === 2 ? "active" : ""}`}
              >
                <h3>{faq.faq2.header}</h3>
                <p>{faq.faq2.para}</p>
              </div>
              <h4>02.</h4>
            </div>
            {/* Item1 */}
            <div
              className={`contact-faq-container-item ${active === 3 ? "active" : ""}`}
              onMouseEnter={() => setActive(3)}
            >
              <div
                className={`contact-faq-container-item-text ${active === 3 ? "active" : ""}`}
              >
                <h3>{faq.faq3.header}</h3>
                <p>{faq.faq3.para}</p>
              </div>
              <h4>03.</h4>
            </div>
            {/* Item1 */}
            <div
              className={`contact-faq-container-item ${active === 4 ? "active" : ""}`}
              onMouseEnter={() => setActive(4)}
            >
              <div
                className={`contact-faq-container-item-text ${active === 4 ? "active" : ""}`}
              >
                <h3>{faq.faq4.header}</h3>
                <p>{faq.faq4.para}</p>
              </div>
              <h4>04.</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
