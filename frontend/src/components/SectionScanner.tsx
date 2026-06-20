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
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_15px_rgba(0,242,255,1),0_0_30px_rgba(0,242,255,0.6)] animate-section-scan" />
      
      {/* Sweeping scan glow beam */}
      <div className="absolute left-0 right-0 h-[150px] bg-gradient-to-b from-[#00f2ff]/0 via-[#00f2ff]/10 to-[#00f2ff]/0 animate-section-scan-beam" />
    </div>
  );
};

export default SectionScanner;
