import { useEffect, useRef, useState } from "react";
import { Server, Code, GitBranch, Cloud, Container, Network, Terminal, Layers } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import SectionScanner from "@/components/SectionScanner";

const skills = [
  { icon: Terminal,  title: "Linux & OS",            description: "Ubuntu · System Admin · CLI",           level: 90, color: "#00f2ff" },
  { icon: GitBranch, title: "Version Control",        description: "Git · GitHub",                         level: 85, color: "#00f2ff" },
  { icon: Layers,    title: "Infrastructure as Code", description: "Terraform · OpenTofu · Ansible",       level: 80, color: "#00f2ff" },
  { icon: Server,    title: "CI/CD & Automation",     description: "Jenkins · GitHub Actions · Argo CD",   level: 80, color: "#00f2ff" },
  { icon: Code,      title: "Scripting & Backend",    description: "Python · Bash · Node.js",              level: 80, color: "#00f2ff" },
  { icon: Container, title: "Containers & Orchestration", description: "Docker · Docker Compose · K8s",   level: 75, color: "#00f2ff" },
  { icon: Network,   title: "Monitoring & Logging",   description: "Prometheus · Grafana · Linux tools",   level: 75, color: "#00f2ff" },
  { icon: Cloud,     title: "Cloud Computing",         description: "AWS (EC2, S3, IAM, VPC)",             level: 70, color: "#00f2ff" },
  { icon: Network,   title: "Networking",              description: "TCP/IP · DNS · Troubleshooting",      level: 75, color: "#00f2ff" },
];

const SkillCard = ({ skill, index, animate }: { skill: typeof skills[0]; index: number; animate: boolean }) => {
  const Icon = skill.icon;
  return (
    <div
      className={`glass-card p-6 rounded-xl border border-[#3a494b]/10 group transition-all duration-500 hover:-translate-y-2 hover:border-[#00f2ff]/30 hover:shadow-[0_10px_30px_-5px_rgba(0,242,255,0.15)] ${
        animate ? "opacity-100 translate-y-0 animate-fade-up" : "opacity-0 translate-y-8"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#00f2ff]/5 border border-[#00f2ff]/20">
          <Icon size={18} className="text-[#00f2ff]" />
        </div>
        <div>
          <h4 className="font-mono text-sm font-semibold text-[#dce4e5]">{skill.title}</h4>
          <p className="font-mono text-[11px] text-[#b9cacb]/70 mt-0.5">{skill.description}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="font-mono text-[10px] text-[#b9cacb]/60">METRIC_CAPACITY</span>
          <span className="font-mono text-[11px] font-bold text-[#00f2ff]">
            {skill.level}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00f2ff]/60 to-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all duration-1000 ease-out"
            style={{
              width: animate ? `${skill.level}%` : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-20 max-w-[1200px] mx-auto overflow-hidden relative">
      <SectionScanner inView={inView} />
      {/* Header */}
      <div className="mb-14">
        <h2 className="font-mono text-2xl text-[#dce4e5] mb-4 tracking-wider uppercase font-bold">
          EXPERTISE_
        </h2>
        <div className="w-16 h-1 bg-[#00f2ff] mb-8"></div>
        <p className="font-sans text-[#b9cacb] max-w-xl leading-relaxed text-sm">
          A comprehensive suite of skills focused on systems automation, reliability, and cloud infrastructure.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <SkillCard key={skill.title} skill={skill} index={i} animate={inView} />
        ))}
      </div>

      {/* Tech chips row */}
      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        {["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Argo CD", "Prometheus", "Grafana", "GitHub Actions", "Ansible", "Python", "Bash", "Node.js", "Linux", "Git"].map((tech) => (
          <span key={tech} className="font-mono text-xs px-3 py-1 rounded bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[#00f2ff]">
            {tech}
          </span>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-14">
        <div className="glass-card p-8 rounded-xl border border-[#00f2ff]/15 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#00f2ff]/80 mb-3 uppercase tracking-widest">// COMMITMENT TO QUALITY</p>
          <p className="font-sans text-[#b9cacb] text-sm leading-relaxed">
            With a focus on DevOps principles and systems engineering, I deliver robust, scalable,
            and automated solutions. My expertise spans Linux administration, cloud infrastructure,
            and CI/CD pipelines — ensuring high availability and efficiency for modern technical projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;