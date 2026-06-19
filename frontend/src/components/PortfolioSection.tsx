import { useState, useEffect, useRef } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { API_URL } from "@/lib/api-config";
import { useInView } from "@/hooks/use-in-view";
import { triggerTransition } from "@/lib/transition";
import SectionScanner from "@/components/SectionScanner";

interface ProjectItem {
  id?: string | number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  projectUrl?: string;
  imageUrl?: string;
  filterTag?: string;
  longDescription?: string;
  architecture?: string[];
  devopsFocus?: string[];
}

const staticItems: ProjectItem[] = [
  {
    id: 1,
    title: "ApexPOS",
    category: "Cloud-Native SaaS",
    filterTag: "Cloud",
    description:
      "Cloud-native POS system on AWS. Automated infra with Terraform & Ansible. CI/CD via Jenkins & Argo CD. Kubernetes for orchestration.",
    tags: ["AWS", "Terraform", "Jenkins", "Argo CD", "Kubernetes", "Docker"],
    projectUrl: "https://github.com/Ntharusha/ApexPOS",
    longDescription:
      "ApexPOS is a production-ready, cloud-native Point of Sale SaaS platform deployed on AWS. The project demonstrates advanced infrastructure automation and GitOps deployment patterns designed to scale under load.",
    architecture: [
      "Microservices orchestrated via Amazon EKS (Kubernetes)",
      "Infrastructure provisioned declaratively using Terraform IaC",
      "Server provisioning and configuration managed via Ansible Playbooks",
    ],
    devopsFocus: [
      "CI/CD: Declarative multi-branch Jenkins pipelines building Docker images",
      "GitOps: Automated deployments using Argo CD syncing cluster state with Git repositories",
      "High Availability: Load balancers, auto-scaling groups, and multi-AZ database clustering",
    ],
  },
  {
    id: 2,
    title: "Lankan Premiere",
    category: "Movie Ticketing System",
    filterTag: "Full-Stack",
    description:
      "Full-stack ticketing platform with React, Node.js & MongoDB. AWS infra via Terraform. Prometheus + Grafana monitoring.",
    tags: ["React", "Node.js", "AWS", "Terraform", "Prometheus", "Grafana"],
    projectUrl: "https://github.com/Ntharusha/Lankan-Primire",
    longDescription:
      "Lankan Premiere is a high-volume movie ticketing and reservation platform featuring real-time seating updates via WebSockets and automated cloud deployments.",
    architecture: [
      "Containerized multi-tier web application built with React, Node.js, and MongoDB",
      "Real-time state synchronization using WebSocket connections",
      "High-performance VPC networking on AWS with isolated subnets",
    ],
    devopsFocus: [
      "Observability: End-to-end monitoring using Prometheus node exporters and custom Grafana dashboards",
      "Automation: Full GitHub Actions pipelines for automated linting, unit testing, and Docker builds",
      "Scaling: Elastic Container Service (ECS) Fargate deployments for serverless container running",
    ],
  },
  {
    id: 3,
    title: "UniSync",
    category: "Lecturer Appointment System",
    filterTag: "Full-Stack",
    description:
      "Cross-platform university appointment scheduling system. Automated AWS deployment using Terraform, containerized services with Docker, and synchronized real-time data using Redis and Socket.IO.",
    tags: ["React", "Node.js", "Terraform", "Docker", "AWS", "Redis", "Socket.IO"],
    projectUrl: "https://github.com/Ntharusha",
    longDescription:
      "UniSync is a comprehensive university scheduling and lecturer appointment management system that enables students and faculty to coordinate calendars in real-time.",
    architecture: [
      "Mobile client built with React Native and web interface with React",
      "Scalable backend API built with Express, Node.js, and MongoDB",
      "In-memory Redis cache layer for managing real-time slot bookings and concurrency controls",
    ],
    devopsFocus: [
      "Real-Time Sync: Socket.IO cluster backed by Redis adapter for multi-instance scaling",
      "Dockerized: Full local orchestration using docker-compose for multi-container local dev",
      "Infrastructure: Terraform files to automatically set up AWS ECS, RDS, and ElastiCache Redis",
    ],
  },
  {
    id: 4,
    title: "DevOps Study Companion",
    category: "Full-Stack Web App",
    filterTag: "Full-Stack",
    description:
      "Learning tracker with React & Node.js. GitHub Actions CI, Terraform AWS infra, Docker portability, live health monitoring.",
    tags: ["React", "Node.js", "GitHub Actions", "Terraform", "Docker", "AWS"],
    projectUrl: "https://github.com/Ntharusha/DevOps-Study-Companion",
    longDescription:
      "A specialized learning management and practice tracker designed specifically for student developers keeping track of DevOps tools, concepts, and certification milestones.",
    architecture: [
      "Lightweight single page application frontend with dynamic React components",
      "Node.js rest API backend exposing health status endpoints for monitoring",
      "AWS deployment utilizing EC2 instances, S3 buckets, and CloudFront CDN for global distribution",
    ],
    devopsFocus: [
      "Continuous Integration: Automated linting and tests triggered on branch pushes via GitHub Actions",
      "Infrastructure: Terraform scripts for automated resource setup and lifecycle management",
      "Docker: Standardized container images ensuring dev-prod parity",
    ],
  },
];

const filterTagColors: Record<string, string> = {
  Cloud: "#00f2ff",
  "Full-Stack": "#00f2ff",
  DevOps: "#00f2ff",
  IaC: "#00f2ff",
};

const PortfolioSection = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  const filters = ["All", "Cloud", "Full-Stack", "DevOps"];

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data?.length > 0) setItems([...data, ...staticItems]);
          else setItems(staticItems);
        } else setItems(staticItems);
      } catch {
        setItems(staticItems);
      } finally {
        setIsLoading(false);
      }
    };
    fetch_();
  }, []);

  const displayed =
    filter === "All"
      ? items
      : items.filter((i) => i.filterTag === filter || i.category === filter);

  const scrollToContact = () => triggerTransition("contact");

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 px-6 md:px-20 max-w-[1200px] mx-auto overflow-hidden relative">
      <SectionScanner inView={inView} />
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-mono text-2xl text-primary mb-4 tracking-wider uppercase font-bold">
            LOGS_
          </h2>
          <div className="w-16 h-1 bg-[#00f2ff]"></div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-all border ${
                filter === f
                  ? "bg-[#00f2ff] text-[#00363a] border-[#00f2ff] font-semibold"
                  : "bg-transparent text-[#b9cacb] border-[#3a494b]/20 hover:border-[#00f2ff]/50 hover:text-[#dce4e5]"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[#3a494b]/20 border-t-[#00f2ff] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item, i) => {
            return (
              <div
                key={item.id ?? i}
                className={`glass-card rounded-xl border border-[#3a494b]/10 overflow-hidden flex flex-col group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-[#00f2ff]/40 hover:shadow-[0_10px_30px_-5px_rgba(0,242,255,0.2)] ${
                  inView ? "opacity-100 translate-y-0 animate-fade-up" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => setActiveProject(item)}
              >
                {/* Visual / Terminal header area */}
                <div className="aspect-[16/9] relative overflow-hidden bg-[#0d1515] border-b border-[#3a494b]/10 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-[85%] font-mono text-[10px] text-[#00f2ff]/80 bg-[#070b0b] p-4 rounded border border-[#00f2ff]/10">
                      <div className="flex items-center gap-1.5 mb-2 border-b border-[#00f2ff]/10 pb-1.5 opacity-60">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                        <span className="ml-1 text-[8px] text-[#b9cacb]/50">bash</span>
                      </div>
                      <div className="space-y-1">
                        <div>$ kubectl describe deployment {item.title.toLowerCase()}</div>
                        <div className="text-white/40"># Deploying infrastructure...</div>
                        <div className="text-[#10b981]">Status: ACTIVE (100% Ok)</div>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay with detail */}
                  <div className="absolute inset-0 bg-[#0d1515]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <p className="font-sans text-xs text-[#b9cacb] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono text-[10px] text-[#b9cacb]/50">SOURCE: GITHUB</span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-[#00f2ff] hover:underline">
                        VIEW_SPECS <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white/[0.01]">
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-[#dce4e5] mb-2 uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-[#b9cacb]/60 mb-4">{item.category}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#00f2ff]/5 border border-[#00f2ff]/10 text-[#00f2ff]/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Collaboration footer block */}
      <div className="mt-16 text-center">
        <div className="glass-card p-8 rounded-xl border border-[#00f2ff]/10 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-[#00f2ff]/70 mb-3 uppercase tracking-widest">// COLLABORATE</p>
          <h4 className="font-mono text-base font-semibold text-[#dce4e5] mb-3 uppercase tracking-wider">
            Interested in Working Together?
          </h4>
          <p className="font-sans text-[#b9cacb]/80 text-sm mb-8 leading-relaxed">
            Always looking for opportunities to contribute to innovative technical projects
            and help teams improve their development lifecycle.
          </p>
          <button
            onClick={scrollToContact}
            className="liquid-glow-btn bg-[#00f2ff] text-[#00363a] font-mono text-xs font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto shadow-[0_0_10px_rgba(0,242,255,0.2)]"
          >
            START_CONVERSATION
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Detail Modal Popup */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b0b]/90 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="glass-card max-w-2xl w-full border border-[#00f2ff]/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.15)] flex flex-col max-h-[90vh] bg-[#0d1515]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#3a494b]/20 bg-[#070b0b]/50">
              <div>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20 uppercase tracking-widest">
                  {activeProject.filterTag}
                </span>
                <h3 className="font-mono text-lg font-bold text-white uppercase mt-2 tracking-wide">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded-lg border border-[#3a494b]/20 hover:border-[#00f2ff]/40 flex items-center justify-center text-[#b9cacb] hover:text-[#00f2ff] transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-[#3a494b]/20">
              <div>
                <h4 className="font-mono text-xs text-[#00f2ff] uppercase tracking-wider mb-2">// OVERVIEW</h4>
                <p className="font-sans text-sm text-[#b9cacb] leading-relaxed">
                  {activeProject.longDescription || activeProject.description}
                </p>
              </div>

              {activeProject.architecture && activeProject.architecture.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs text-[#00f2ff] uppercase tracking-wider mb-2">// SYSTEM_ARCHITECTURE</h4>
                  <ul className="space-y-2">
                    {activeProject.architecture.map((item, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs font-sans text-[#b9cacb]">
                        <span className="text-[#00f2ff] mt-0.5 font-mono">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeProject.devopsFocus && activeProject.devopsFocus.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs text-[#00f2ff] uppercase tracking-wider mb-2">// AUTOMATION_&_DEVOPS</h4>
                  <ul className="space-y-2">
                    {activeProject.devopsFocus.map((item, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs font-sans text-[#b9cacb]">
                        <span className="text-[#00f2ff] mt-0.5 font-mono">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-mono text-xs text-[#00f2ff] uppercase tracking-wider mb-3">// TECH_STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[#00f2ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#3a494b]/20 bg-[#070b0b]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-mono text-[9px] text-[#b9cacb]/40">
                SOURCE: GITHUB.COM/NTHARUSHA
              </span>
              {activeProject.projectUrl && (
                <a
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glow-btn bg-[#00f2ff] text-[#00363a] font-mono text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-[0_0_10px_rgba(0,242,255,0.2)] hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  VISIT_REPOSITORY_
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;