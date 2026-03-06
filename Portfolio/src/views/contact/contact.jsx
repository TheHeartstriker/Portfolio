"use client";
import InteractiveBG from "./interactiveBG.jsx";
import ContactButton from "./contactButton.jsx";
import "./contact.css";
import { Separator } from "@/components/separator/separator.jsx";
import { useState } from "react";
import { lorem } from "@/utils/text.js";
function Contact() {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="contact">
        {/*  */}
        {/* Contact intro */}
        {/*  */}
        <div className="contact-intro">
          <div className="contact-intro-left">
            <h2>Get in</h2>
            <h2>Touch</h2>

            <div className="contact-intro-left-email">
              <h3>serkadenwildauer@gmail.com</h3>
            </div>
          </div>
          <div className="contact-intro-right">
            <h3>
              I genuinely care about your project. Let me know if I can bring it
              or something to life for you.
            </h3>
            <div className="contact-intro-right-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
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
                <h3>How can I start a project with you?</h3>
                {active === 1 && <p>{lorem}</p>}
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
                <h3>How can I start a project with you?</h3>
                {active === 2 && <p>{lorem}</p>}
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
                <h3>How can I start a project with you?</h3>
                {active === 3 && <p>{lorem}</p>}
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
                <h3>How can I start a project with you?</h3>
                {active === 4 && <p>{lorem}</p>}
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
