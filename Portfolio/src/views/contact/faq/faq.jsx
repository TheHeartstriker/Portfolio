import { Separator } from "@/components/separator/separator.jsx";
import { useState } from "react";
import "./faq.css";
import { faq } from "../text.js";
import FAQAni from "./faqAni.jsx";
function FAQ() {
  const [active, setActive] = useState(1);

  return (
    <div className="contact-faq">
      <FAQAni />
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
  );
}

export default FAQ;
