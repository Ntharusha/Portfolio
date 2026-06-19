import { useRef } from "react";
import { ArrowRight, Server, Cloud, Code, Settings, Shield, Activity } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { triggerTransition } from "@/lib/transition";
import SectionScanner from "@/components/SectionScanner";

const services = [
  // ...
  {
    icon: Settings,
    title: "Infrastructure & DevOps",
    description:
      "Linux server setup, CI/CD pipeline design, and cloud-native infrastructure management using Terraform and Ansible IaC.",
    price: "Let's Discuss",
    tags: ["Linux", "Terraform", "Ansible"],
    accent: "#00f2ff",
  },
  {
    icon: Code,
    title: "Automation & Scripting",
    description:
      "Custom Bash and Python scripts for task automation, system optimization, and eliminating repetitive manual DevOps work.",
    price: "Let's Discuss",
    tags: ["Python", "Bash", "Shell"],
    accent: "#00f2ff",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "AWS multi-cloud deployment, configuration, and cloud-native infrastructure — EC2, S3, IAM, VPC, and beyond.",
    price: "Let's Discuss",
    tags: ["AWS", "Cloud", "IaC"],
    accent: "#00f2ff",
  },
  {
    icon: Server,
    title: "CI/CD Pipelines",
    description:
      "Designing and implementing automated testing and deployment workflows for rapid, reliable delivery using Jenkins, GitHub Actions, and Argo CD.",
    price: "Let's Discuss",
    tags: ["Jenkins", "GitHub Actions", "Argo CD"],
    accent: "#00f2ff",
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    description:
      "Prometheus & Grafana monitoring stacks for comprehensive alerting, dashboards, and high-availability incident response.",
    price: "Let's Discuss",
    tags: ["Prometheus", "Grafana"],
    accent: "#00f2ff",
  },
  {
    icon: Shield,
    title: "Security Engineering",
    description:
      "Integrating automated security scanning and DevSecOps principles into the software delivery lifecycle for hardened deployments.",
    price: "Let's Discuss",
    tags: ["DevSecOps", "Scanning"],
    accent: "#00f2ff",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  const scrollToContact = () =>
    triggerTransition("contact");

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 md:px-20 max-w-[1200px] mx-auto overflow-hidden relative">
      <SectionScanner inView={inView} />
      {/* Header */}
      <div className="mb-14">
        <h2 className="font-mono text-2xl text-primary mb-4 tracking-wider uppercase font-bold">
          SERVICES_
        </h2>
        <div className="w-16 h-1 bg-[#00f2ff] mb-8"></div>
        <p className="font-sans text-[#b9cacb] max-w-xl leading-relaxed text-sm">
          Specialized technical solutions focused on reliability, scalability, and automation excellence.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.title}
              className={`glass-card p-6 rounded-xl border border-[#3a494b]/10 group flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-[#00f2ff]/40 hover:shadow-[0_10px_30px_-5px_rgba(0,242,255,0.2)] ${
                inView ? "opacity-100 translate-y-0 animate-fade-up" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-[#00f2ff]/5 border border-[#00f2ff]/20"
              >
                <Icon
                  size={22}
                  className="text-[#00f2ff] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="font-mono text-sm font-semibold text-[#dce4e5] mb-3 uppercase tracking-wider">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs text-[#b9cacb]/80 leading-relaxed flex-1 mb-6">
                {svc.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {svc.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00f2ff]/5 text-[#00f2ff] border border-[#00f2ff]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Price + CTA row */}
              <div className="pt-4 border-t border-[#3a494b]/10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#dce4e5]">
                  {svc.price}
                </span>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#00f2ff] hover:underline transition-all group/link"
                >
                  GET_STARTED
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Partnership CTA */}
      <div className="mt-16">
        <div className="glass-card p-8 rounded-xl border border-[#00f2ff]/10 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#00f2ff]/75 mb-3 uppercase tracking-widest">// PARTNERSHIP</p>
          <h4 className="font-mono text-base font-semibold text-[#dce4e5] mb-4 uppercase tracking-wider">
            A Technical Partnership
          </h4>
          <p className="font-sans text-[#b9cacb] text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            I work directly with teams to solve complex infrastructure challenges — whether migrating
            to cloud or improving CI/CD processes, I provide technical expertise and reliability.
          </p>
          <button
            onClick={scrollToContact}
            className="liquid-glow-btn bg-[#00f2ff] text-[#00363a] font-mono text-xs font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto shadow-[0_0_10px_rgba(0,242,255,0.2)]"
          >
            DISCUSS_PROJECT
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;