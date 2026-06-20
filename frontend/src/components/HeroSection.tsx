import { useEffect, useState } from "react";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import profileImage from "@/assets/tharusha.png";
import { triggerTransition } from "@/lib/transition";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollTo = (id: string) => {
    triggerTransition(id);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24 lg:py-28 max-w-[1200px] mx-auto overflow-hidden"
    >
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left column - Information */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
          {/* Status indicator */}
          <div
            className={`flex items-center justify-center lg:justify-start gap-2 mb-6 text-terminal-green font-mono text-sm tracking-wider smooth-transition ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="status-pulse"></span>
            SYSTEM_STATUS: ACTIVE // ROOT_READY
          </div>

          {/* Headline */}
          <div
            className={`smooth-transition ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#dce4e5] mb-6 leading-[1.1] uppercase font-bold tracking-tight">
              Architecting <br />
              <span className="text-[#00f2ff] drop-shadow-[0_0_15px_#00f2ff]">
                Scalable Futures
              </span>{" "}
              <br />
              Through DevOps.
            </h1>
          </div>

          {/* Description */}
          <div
            className={`smooth-transition ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="font-sans text-[#b9cacb] mb-10 max-w-xl leading-relaxed text-base sm:text-lg">
              I am <span className="text-white font-medium">Tharusha Bhashitha</span>, a DevOps Engineer dedicated to streamlining development lifecycles and optimizing cloud infrastructure for maximum reliability.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap justify-center lg:justify-start gap-4 mb-12 smooth-transition ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <button
              onClick={() => scrollTo("portfolio")}
              className="liquid-glow-btn bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 font-mono text-sm font-semibold px-8 py-3.5 rounded flex items-center gap-2 hover:bg-[#00f2ff]/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,255,0.15)]"
            >
              VIEW_PROJECTS
              <ArrowRight size={16} />
            </button>
            <a
              href="/resume.pdf"
              download
              className="glass-card px-8 py-3.5 rounded font-mono text-sm text-[#00f2ff] flex items-center gap-2 border border-[#00f2ff]/20 hover:border-[#00f2ff]/50 transition-all duration-300"
            >
              DOWNLOAD_CV
              <Download size={16} />
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-6 sm:gap-12 max-w-xl w-full pt-6 border-t border-[#3a494b]/20 smooth-transition ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {[
              { value: "07+", label: "TOOLS_MASTERED" },
              { value: "50+", label: "PROJECTS_COMPLETED" },
              { value: "2026", label: "EXPECTED_GRAD" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start">
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#00f2ff] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] sm:text-xs text-[#b9cacb]/70 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Cyberpunk Profile Image */}
        <div
          className={`lg:col-span-5 flex justify-center items-center order-2 smooth-transition ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="relative group w-[260px] sm:w-[300px] lg:w-[320px] aspect-[4/5] p-2 rounded-2xl bg-[#0d1515]/60 border border-[#00f2ff]/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,242,255,0.08)] transition-all duration-500 hover:border-[#00f2ff]/50 hover:shadow-[0_0_40px_rgba(0,242,255,0.25)]">
            {/* Glowing Backdrop Aura */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#00f2ff]/30 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none" />

            {/* Corner Cyber Brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#00f2ff] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#00f2ff] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#00f2ff] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#00f2ff] rounded-br-lg" />

            {/* Scanning Vertical Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_10px_rgba(0,242,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-scanline-vertical pointer-events-none" />

            {/* Portrait Image Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#3a494b]/20 bg-[#070b0b]">
              <img
                src={profileImage}
                alt="Tharusha Bhashitha Portrait"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Scanline pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
            </div>

            {/* HUD Status Elements */}
            <div className="font-mono text-[9px] text-[#00f2ff]/80 tracking-widest absolute bottom-4 left-4 bg-[#070b0b]/90 px-2.5 py-1 border border-[#00f2ff]/20 rounded backdrop-blur-sm select-none">
              HOST_REF: TB_ARCH
            </div>
            <div className="font-mono text-[9px] text-[#00f2ff]/80 tracking-widest absolute top-4 right-4 bg-[#070b0b]/90 px-2.5 py-1 border border-[#00f2ff]/20 rounded backdrop-blur-sm select-none">
              SYS_SEC: READY
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#b9cacb]/50">
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;