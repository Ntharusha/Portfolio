import { useEffect, useState, RefObject } from "react";

export const useInView = (ref: RefObject<HTMLElement>, threshold = 0.1) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once it's in view, we can stop observing if we want a one-shot animation
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
};
