"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function Tab() {
  const pathname = usePathname();

  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Humph!" : originalTitle;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}

export default Tab;
