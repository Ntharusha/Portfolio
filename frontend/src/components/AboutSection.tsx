import { useRef } from "react";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import SectionScanner from "@/components/SectionScanner";

const education = [
  // ...
  {
    degree: "BSc in Applied Mathematics and Computing",
    institution: "University of Vavuniya",
    period: "2023 – Present",
  },
  {
    degree: "G.C.E. Advanced Level (A/L)",
    institution: "Gankanda Central College",
    period: "2020 / 2021",
  },
  {
    degree: "G.C.E. Ordinary Level (O/L)",
    institution: "Vidyakara Isuru School",
    period: "2017",
  },
];

const certifications = [
  { name: "Ultimate DevOps Bootcamp", issuer: "School of DevOps", date: "Mar 2026", done: true },
  { name: "Ultimate Terraform & OpenTofu Bootcamp", issuer: "School of DevOps", date: "Apr 2026", done: true },
  { name: "CI/CD with Jenkins and Docker", issuer: "School of DevOps", date: "Feb 2026", done: true },
  { name: "AWS Certified Cloud Practitioner (CLF-C02)", issuer: "Amazon Web Services", date: "In Progress", done: false },
  { name: "Ultimate Advanced Kubernetes Bootcamp", issuer: "School of DevOps", date: "In Progress", done: false },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-20 max-w-[1200px] mx-auto overflow-hidden relative">
      <SectionScanner inView={inView} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Heading & Introduction */}
        <div className={`lg:col-span-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-mono text-2xl text-primary mb-4 tracking-wider uppercase font-bold">
            IDENTIFICATION_
          </h2>
          <div className="w-16 h-1 bg-[#00f2ff] mb-8"></div>
          <p className="font-sans text-[#b9cacb] leading-relaxed text-sm">
            With a foundation in software engineering and a passion for automation, I bridge the gap between development and operations. My approach focuses on security, performance, and continuous improvement.
          </p>

          {/* Quick facts grid */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            {[
              { label: "LOCATION", value: "Rathnapura, Sri Lanka" },
              { label: "STATUS", value: "Available for Hire" },
              { label: "FOCUS", value: "DevOps & Cloud Systems" },
              { label: "GRADUATION", value: "2026 (Expected)" },
            ].map((fact) => (
              <div key={fact.label} className="glass-card py-4 px-5 rounded-lg border border-[#3a494b]/20 hover:-translate-y-1 hover:border-[#00f2ff]/30 hover:shadow-[0_5px_15px_-5px_rgba(0,242,255,0.15)] transition-all duration-300">
                <div className="font-mono text-[10px] text-[#00f2ff]/70 mb-1 uppercase tracking-widest">{fact.label}</div>
                <div className="font-sans text-sm text-[#dce4e5] font-medium">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education & Certifications */}
        <div className={`lg:col-span-8 space-y-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Education */}
          <div>
            <h3 className="font-mono text-lg text-primary mb-4 uppercase tracking-wider font-semibold flex items-center gap-2">
              <GraduationCap size={20} className="text-[#00f2ff]" />
              EDUCATION
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="glass-card p-6 rounded-lg border border-[#3a494b]/10 flex items-start gap-4 hover:-translate-y-1 hover:border-[#00f2ff]/30 hover:shadow-[0_5px_15px_-5px_rgba(0,242,255,0.15)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#00f2ff]/5 border border-[#00f2ff]/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={18} className="text-[#00f2ff]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm text-[#dce4e5] font-semibold mb-1">{edu.degree}</h4>
                    <div className="flex items-center gap-2 text-xs text-[#b9cacb]/70">
                      <MapPin size={12} />
                      <span>{edu.institution} · {edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono text-lg text-primary mb-4 uppercase tracking-wider font-semibold flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#00f2ff]" />
              CERTIFICATIONS
            </h3>
            <div className="glass-card p-6 rounded-lg border border-[#3a494b]/10 space-y-4 hover:-translate-y-1 hover:border-[#00f2ff]/30 hover:shadow-[0_5px_15px_-5px_rgba(0,242,255,0.15)] transition-all duration-300">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-[#3a494b]/10 last:border-0 last:pb-0">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: cert.done ? "#10b981" : "#849495" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-sm text-[#dce4e5] leading-snug">{cert.name}</div>
                    <div className="font-mono text-xs text-[#b9cacb]/60 mt-1">
                      {cert.issuer} · {cert.date}
                    </div>
                  </div>
                  {!cert.done && (
                    <span className="font-mono text-[9px] px-2 py-0.5 border border-yellow-500/20 text-yellow-500 bg-yellow-500/5 rounded flex-shrink-0">
                      WIP
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;