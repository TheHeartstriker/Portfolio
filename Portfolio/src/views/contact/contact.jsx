"use client";
import "./contact.css";
import FAQ from "./faq/faq.jsx";
import Hero from "./hero/hero";
function Contact() {
  return (
    <>
      <div className="contact-container">
        <Hero />
        <FAQ />
      </div>
    </>
  );
}

export default Contact;
