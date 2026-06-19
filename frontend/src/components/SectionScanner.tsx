import { useEffect, useState } from "react";

interface SectionScannerProps {
  inView: boolean;
}

export const SectionScanner = ({ inView }: SectionScannerProps) => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (inView && !scanned) {
      setScanned(true);
    }
  }, [inView, scanned]);

  if (!scanned) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Sweeping scanline */}
      <div className="absolute left-0 right-0 h-[2px] bg-[#00f2ff] shadow-[0_0_15px_#00f2ff,0_0_30px_rgba(0,242,255,0.4)] animate-section-scan" />
    </div>
  );
};

export default SectionScanner;
