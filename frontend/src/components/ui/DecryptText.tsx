import { useEffect, useState } from "react";

interface DecryptTextProps {
  text: string;
  inView: boolean;
  delay?: number;
}

export const DecryptText = ({ text, inView, delay = 0 }: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&{}_+<>";

  useEffect(() => {
    if (!inView) {
      setDisplayText("");
      return;
    }

    let isMounted = true;
    let frame = 0;
    const targetText = text;
    const duration = 25; // Speed/number of frames per character resolution
    
    const startTime = setTimeout(() => {
      const interval = setInterval(() => {
        if (!isMounted) {
          clearInterval(interval);
          return;
        }

        const currentFrame = frame++;
        const resolvedText = targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            const progress = (currentFrame - index * 2) / duration;
            if (progress >= 1) return char;
            if (progress > 0) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return "";
          })
          .join("");

        setDisplayText(resolvedText);

        const allResolved = targetText.split("").every((char, index) => {
          return (frame - index * 2) / duration >= 1;
        });

        if (allResolved) {
          setDisplayText(targetText);
          clearInterval(interval);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(startTime);
      isMounted = false;
    };
  }, [text, inView, delay]);

  // Fallback to empty text if not in view, or display full text if not animated yet
  return <span>{displayText || (inView ? "" : text)}</span>;
};

export default DecryptText;
