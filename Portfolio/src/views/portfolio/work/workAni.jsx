"use client";
import styles from "./work.module.css";
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";

function WorkAni() {
  //
  // Main left side indicator animation
  //
  useEffect(() => {
    //
    // Collect refrences
    const items = document.querySelectorAll(
      `.${styles["work-main-info-indi-item"]}`,
    );
    const imageContainers = document.querySelectorAll(
      `.${styles["work-main-info-indi-item-image"]}`,
    );
    const indiContainer = document.querySelector(
      `.${styles["work-main-info-indi"]}`,
    );
    const conItems = document.querySelectorAll(
      `.${styles["work-main-con-item"]}`,
    );
    const svg = items[0]?.querySelector("svg");
    if (!items.length || !conItems.length || !svg || !indiContainer) return;

    // Capture the -50% centering offset (in px) BEFORE any GSAP tween
    // overwrites it. This has to run before any other gsap call touches svg.
    const baseY = gsap.getProperty(svg, "y");

    gsap.set(imageContainers, {
      "--image-overlay-opacity": 0.5,
    });

    const itemHeight = items[0].getBoundingClientRect().height;
    const gap = parseFloat(getComputedStyle(indiContainer).rowGap) || 0;
    const step = itemHeight + gap;
    let activeIndex = -1;
    let pulseTween = null;

    function setActive(index) {
      if (index === activeIndex) return;
      activeIndex = index;

      gsap.to(svg, {
        y: baseY + index * step,
        duration: 0.45,
        ease: "power2.out",
      });

      // Un-dim the active image, dim the rest
      imageContainers.forEach((img, i) => {
        gsap.killTweensOf(img);

        if (i === index) {
          gsap.set(img, { "--image-overlay-opacity": 0 });
          if (pulseTween) pulseTween.kill();
          pulseTween = gsap.to(img, {
            "--image-overlay-opacity": 0,
            duration: 0.45,
            ease: "power2.out",
          });
        } else {
          gsap.to(img, {
            "--image-overlay-opacity": 0.5,
            duration: 0.45,
            ease: "power2.out",
          });
        }
      });
    }

    //
    // Simple way to know what's centered: collapse the root to a line
    // at 50% viewport height, whatever item crosses it is active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Array.from(conItems).indexOf(entry.target));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    conItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      if (pulseTween) pulseTween.kill();
    };
  }, []);

  useEffect(() => {}, []);
  return null;
}

export default WorkAni;
