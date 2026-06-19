import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Mail, href: "mailto:ntb069@gmail.com", label: "Email" },
    { icon: Phone, href: "tel:+94763629126", label: "Phone" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/tharusha69/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Ntharusha", label: "GitHub" },
  ];

  const links = [
    { label: "STATION", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "EXPERTISE", id: "skills" },
    { label: "SERVICES", id: "services" },
    { label: "LOGS", id: "portfolio" },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-[#3a494b]/10 bg-[#0d1515]">
      <div className="max-w-[1200px] mx-auto py-12 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-mono font-bold text-xl text-primary">
              DEVOPS_ARCHITECT
            </div>
            <p className="font-sans text-xs text-[#b9cacb]/70 leading-relaxed max-w-xs">
              DevOps Engineer & Systems Specialist passionate about reliable infrastructure
              and automated workflows.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded bg-[#00f2ff]/5 border border-[#00f2ff]/10 flex items-center justify-center text-[#b9cacb] hover:text-[#00f2ff] hover:border-[#00f2ff]/30 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-[#dce4e5] uppercase mb-4 tracking-wider">Navigation</h4>
            <nav className="space-y-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="block font-mono text-xs text-[#b9cacb]/70 hover:text-[#00f2ff] transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-[#dce4e5] uppercase mb-4 tracking-wider">Services</h4>
            <div className="space-y-2 font-mono text-xs text-[#b9cacb]/60">
              <div>// DEVOPS_SYSADMIN</div>
              <div>// AUTOMATION_SCRIPTING</div>
              <div>// CLOUD_INFRASTRUCTURE</div>
              <div>// CICD_PIPELINE_DESIGN</div>
              <div>// CONTAINERIZATION_K8S</div>
              <div>// MONITOR_OBSERVABILITY</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#3a494b]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-[#b9cacb]/40">
            © {year} THARUSHA BHASHITHA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="status-pulse" />
            <span className="font-mono text-[10px] text-[#b9cacb]/60 uppercase tracking-wider">SYSTEMS_ACTIVE // HIRE_READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;