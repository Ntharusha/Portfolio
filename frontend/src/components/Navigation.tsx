import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { triggerTransition } from "@/lib/transition";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "STATION" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "EXPERTISE" },
    { id: "services", label: "SERVICES" },
    { id: "portfolio", label: "LOGS" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    triggerTransition(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b navbar-header transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : "navbar-unscrolled"
      }`}
    >
      <nav
        className={`flex justify-between items-center px-6 md:px-20 max-w-[1200px] mx-auto navbar-nav transition-all duration-500 ease-in-out ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          className="font-mono text-xl text-[#00f2ff] font-bold tracking-tighter"
        >
          DEVOPS_ARCHITECT
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-mono text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link-underline pb-1 transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-[#00f2ff] font-semibold"
                  : "text-[#b9cacb]/70 hover:text-[#00f2ff]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/5 border border-[#10b981]/20 text-[#10b981] font-mono text-[10px] tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            SYS_STATUS: ACTIVE
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="liquid-glow-btn bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 px-6 py-2 font-mono text-sm font-semibold rounded hover:bg-[#00f2ff]/20 transition-all duration-300"
          >
            INIT_SESSION
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#b9cacb]/70 hover:text-[#00f2ff] transition-colors p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1515] border-t border-[#3a494b]/20 py-4 px-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left py-3 font-mono text-sm tracking-wider transition-colors ${
                activeSection === item.id ? "text-[#00f2ff]" : "text-[#b9cacb]/60"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="liquid-glow-btn bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 py-3 rounded font-mono text-sm font-semibold mt-3 text-center"
          >
            INIT_SESSION
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;