import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, MapPin, Send, Github } from "lucide-react";
import { API_URL } from "@/lib/api-config";
import { useInView } from "@/hooks/use-in-view";
import SectionScanner from "@/components/SectionScanner";

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "DevOps & CI/CD", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = ["DevOps & CI/CD", "Cloud Infrastructure", "System Automation", "Monitoring Setup", "General Inquiry"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData, subject: formData.projectType };
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Message Sent!", description: data.message || "I'll get back to you soon!" });
        setFormData({ name: "", email: "", projectType: "DevOps & CI/CD", message: "" });
      } else {
        toast({ title: "Error", description: data.message || "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection Error", description: "Could not reach server.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/tharusha69/", label: "LinkedIn", color: "#00f2ff" },
    { icon: Github,   href: "https://github.com/Ntharusha",           label: "GitHub",   color: "#00f2ff" },
    { icon: Mail,     href: "mailto:ntb069@gmail.com",                label: "Email",    color: "#00f2ff" },
    { icon: Phone,    href: "tel:+94763629126",                       label: "Phone",    color: "#00f2ff" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-20 max-w-[1200px] mx-auto relative overflow-hidden">
      <SectionScanner inView={inView} />
      {/* Header */}
      <div className="mb-14">
        <h2 className="font-mono text-2xl text-[#dce4e5] mb-4 tracking-wider uppercase font-bold">
          CONTACT_
        </h2>
        <div className="w-16 h-1 bg-[#00f2ff]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: "Let's Build" heading + contact info */}
        <div className="space-y-10">
          <div>
            <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-[#dce4e5] tracking-wider uppercase font-bold">
              LET'S BUILD<br />
              <span className="text-[#00f2ff]">SOMETHING</span><br />
              GREAT
            </h2>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-[#b9cacb]/80">
              <Mail size={16} className="text-[#00f2ff] flex-shrink-0" />
              <a href="mailto:ntb069@gmail.com" className="hover:underline text-[#00f2ff]">
                ntb069@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-[#b9cacb]/80">
              <Phone size={16} className="text-[#00f2ff] flex-shrink-0" />
              <a href="tel:+94763629126" className="hover:underline text-[#00f2ff]">
                +94 763 629 126
              </a>
            </div>
            <div className="flex items-center gap-3 text-[#b9cacb]/80">
              <MapPin size={16} className="text-[#00f2ff] flex-shrink-0" />
              <span>Vavuniya, Sri Lanka · Available Remote</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded bg-[#00f2ff]/5 border border-[#00f2ff]/20 flex items-center justify-center text-[#b9cacb]/80 hover:text-[#00f2ff] hover:border-[#00f2ff]/40 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div className="glass-card p-8 rounded-xl border border-[#3a494b]/10 hover:-translate-y-1 hover:border-[#00f2ff]/30 hover:shadow-[0_5px_15px_-5px_rgba(0,242,255,0.15)] transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-[#0d1515] border border-[#3a494b]/20 rounded px-4 py-3 font-mono text-xs text-foreground focus:outline-none focus:border-[#00f2ff] placeholder-foreground-muted/30"
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#0d1515] border border-[#3a494b]/20 rounded px-4 py-3 font-mono text-xs text-foreground focus:outline-none focus:border-[#00f2ff] placeholder-foreground-muted/30"
              />
            </div>

            {/* Project Type dropdown */}
            <div>
              <label className="font-mono text-[10px] text-[#b9cacb]/60 block mb-2 uppercase tracking-wider">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-[#0d1515] border border-[#3a494b]/20 rounded px-4 py-3 font-mono text-xs text-foreground focus:outline-none focus:border-[#00f2ff]"
              >
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="bg-[#0d1515] text-[#dce4e5]">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full bg-[#0d1515] border border-[#3a494b]/20 rounded px-4 py-3 font-mono text-xs text-foreground focus:outline-none focus:border-[#00f2ff] placeholder-foreground-muted/30 resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="liquid-glow-btn bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 py-3 rounded font-mono text-sm font-semibold mt-3 text-center disabled:opacity-50 hover:bg-[#00f2ff]/20 transition-all duration-300 w-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.15)]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#00f2ff] border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  SEND_MESSAGE
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;