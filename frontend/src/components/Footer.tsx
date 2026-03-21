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
      href: "https://www.linkedin.com/in/tharusha-bhashitha-b985b42b9/",
      label: "LinkedIn"
    },
    {
      icon: Facebook,
      href: "https://web.facebook.com/ArtwaveInnovations",
      label: "Portfolio"
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
              DevOps Engineer & Graphic Designer passionate about bridging technology 
              and creativity. Currently pursuing BSc in Applied Mathematics and Computing 
              at University of Vavuniya.
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
              <div>Logo & Brand Design</div>
              <div>Marketing Materials</div>
              <div>Social Media Graphics</div>
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