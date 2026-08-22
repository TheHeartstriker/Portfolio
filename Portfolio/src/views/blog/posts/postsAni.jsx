"use client";

import { useEffect } from "react";
import gsap from "gsap";

function PostsAni({
  containerRef,
  trigger,
  setActiveTags,
  setTrigger,
  setIsAnimating,
}) {
  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    setIsAnimating(true);

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        setActiveTags((prev) =>
          prev.includes(trigger)
            ? prev.filter((tag) => tag !== trigger)
            : [...prev, trigger],
        );

        setTrigger(null);

        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.9,
          onComplete: () => {
            setIsAnimating(false);
          },
        });
      },
    });
  }, [trigger, containerRef, setActiveTags, setTrigger, setIsAnimating]);

  return null;
}

export default PostsAni;
