"use client";
import { useEffect, useRef, useContext } from "react";
import styles from "./scrollBlur.module.css";
import gsap from "gsap";
import { Context } from "@/components/provider/provider.jsx";

// relative blur "weight" per layer — bottom layer gets the strongest blur sum is 16
const LAYER_WEIGHTS = [1, 2, 4, 8, 16];
// hard cap in px for the strongest layer — tune down, 50 is heavy
const MAX_BLUR = 20;
// px/sec considered "full speed" — tune to taste, log e.velocity to calibrate
const VELOCITY_CAP = 2500;
// how fast intensity ramps up when scrolling speeds up
const ATTACK = 0.5;
// how fast it fades when scrolling slows/stops
const RELEASE = 0.2;
// per-frame decay so it fades even without new scroll events
const TARGET_DECAY = 0.75;

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function ScrollBlur() {
  const layerRefs = useRef([]);
  const smoothedIntensity = useRef(0);
  const targetIntensity = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const { leftMove } = useContext(Context);

  useEffect(() => {
    //
    // Vars
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    function handleLenisScroll(event) {
      const velocity = event?.velocity ?? 0;
      const speed = Math.abs(velocity) * 60;
      targetIntensity.current = clamp01(speed / VELOCITY_CAP);
    }

    function handleNativeScroll() {
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 1);
      const dy = window.scrollY - lastScrollY.current;
      const speed = Math.abs(dy / dt) * 1000; // px/sec
      targetIntensity.current = clamp01(speed / VELOCITY_CAP);
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    }

    const lenisInstance = typeof window !== "undefined" ? window.lenis : null;
    const usingLenis =
      !!lenisInstance && typeof lenisInstance.on === "function";

    if (usingLenis) {
      lenisInstance.on("scroll", handleLenisScroll);
    } else {
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
    }

    function applyBlur(intensity) {
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const weight = LAYER_WEIGHTS[i];
        const blurPx = (weight / 16) * MAX_BLUR * intensity;
        el.style.backdropFilter = `blur(${blurPx.toFixed(2)}px)`;
        el.style.webkitBackdropFilter = `blur(${blurPx.toFixed(2)}px)`;
      });
    }

    function ticker() {
      const target = targetIntensity.current;
      const current = smoothedIntensity.current;
      const rate = target > current ? ATTACK : RELEASE;
      const next = current + (target - current) * rate;
      smoothedIntensity.current = next;

      // decay target continuously so the fade doesn't wait on the next scroll event
      targetIntensity.current *= TARGET_DECAY;

      applyBlur(next);
    }

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      if (usingLenis) {
        lenisInstance.off("scroll", handleLenisScroll);
      } else {
        window.removeEventListener("scroll", handleNativeScroll);
      }
    };
  }, []);

  useEffect(() => {
    console.log(leftMove, "We changed");
  }, [leftMove]);

  return (
    <nav
      className={`${styles["blur-wrap"]} ${
        leftMove ? styles["blur-wrap--right"] : ""
      }`}
    >
      {LAYER_WEIGHTS.map((_, i) => (
        <div key={i} ref={(el) => (layerRefs.current[i] = el)} />
      ))}
    </nav>
  );
}

export default ScrollBlur;
