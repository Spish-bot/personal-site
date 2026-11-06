"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const distance = root.scrollHeight - root.clientHeight;
        setProgress(distance > 0 ? Math.min(1, Math.max(0, root.scrollTop / distance)) : 0);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
