import { animateBlocks, animateText } from "@/utils/animations/animations";
import { useEffect } from "react";

function FAQAni() {
  useEffect(() => {
    const faqCards = document.querySelectorAll(".contact-faq-container-item");
    animateBlocks(
      { start: 25, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      faqCards,
      {
        duration: 0.75,
        easing: "power2.out",
        stagger: 0.15,
      },
    );
  }, []);
}

export default FAQAni;
