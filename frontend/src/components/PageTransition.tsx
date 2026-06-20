import { useEffect, useState } from "react";

export const PageTransition = () => {
  const [active, setActive] = useState(false);
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const id = detail?.targetSectionId;
      if (!id) return;

      setTargetId(id);
      setActive(true);

      // Midpoint: when ripple expands (150ms)
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "auto" });
        }
      }, 150);

      // Finish transition after 400ms
      setTimeout(() => {
        setActive(false);
      }, 400);
    };

    window.addEventListener("page-transition", handleTransition);
    return () => window.removeEventListener("page-transition", handleTransition);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none w-full h-full transition-backdrop flex items-center justify-center overflow-hidden">
      {/* Radar Pulse Circles */}
      <div className="radar-pulse-ring" />
      <div className="radar-pulse-ring-outer" />

      {/* Cybernetic telemetry display */}
      <div className="absolute font-mono text-[9px] text-primary tracking-[0.4em] uppercase bg-background/90 px-3 py-1.5 border border-primary/20 rounded backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary)/0.15)]">
        SECTOR::{targetId}
      </div>
    </div>
  );
};

export default PageTransition;
