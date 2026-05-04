import { Mail, Phone, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:ntb069@gmail.com",
      label: "Email"
    },
    {
      icon: Phone,
      href: "tel:+94763629126",
      label: "Phone"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tharusha69/",
      label: "LinkedIn"
    },
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      href: "https://github.com/Ntharusha",
      label: "GitHub"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">TB</span>
              <span className="text-lg font-semibold">Tharusha Bhashitha</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              DevOps Engineer & Systems Specialist passionate about building reliable 
              infrastructure and automated workflows. Currently pursuing BSc in Applied Mathematics 
              and Computing at the University of Vavuniya.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground smooth-transition"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="block text-muted-foreground hover:text-primary smooth-transition text-sm"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services Summary */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>DevOps & System Administration</div>
              <div>Automation & Scripting</div>
              <div>Cloud Infrastructure</div>
              <div>CI/CD Pipeline Design</div>
              <div>Containerization (Docker)</div>
              <div>System Monitoring</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-sm text-muted-foreground text-center">
            © {currentYear} Tharusha Bhashitha. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;