import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Palette, 
  Server, 
  Cloud, 
  Code, 
  Image,
  ArrowRight
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      category: "Infrastructure & DevOps",
      icon: Settings,
      color: "text-primary",
      bgColor: "bg-primary/10",
      services: [
        {
          title: "System Administration",
          description: "Linux server setup, configuration, and maintenance with security best practices and hardning.",
          icon: Server
        },
        {
          title: "CI/CD Pipelines",
          description: "Designing and implementing automated testing and deployment workflows for rapid delivery.",
          icon: Code
        },
        {
          title: "Cloud Architecture",
          description: "AWS and multi-cloud deployment, configuration, and cloud-native infrastructure management.",
          icon: Cloud
        }
      ]
    },
    {
      category: "Automation & Monitoring",
      icon: Code,
      color: "text-accent",
      bgColor: "bg-accent/10",
      services: [
        {
          title: "Process Automation",
          description: "Custom Bash and Python scripts for task automation and system optimization.",
          icon: Code
        },
        {
          title: "Observability",
          description: "Implementing comprehensive monitoring and alerting systems to ensure high availability.",
          icon: Settings
        },
        {
          title: "Security Engineering",
          description: "Integrating automated security scanning and DevSecOps principles into the lifecycle.",
          icon: Server
        }
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized technical solutions focused on reliability, scalability, and automation excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((serviceCategory, categoryIndex) => {
            const CategoryIcon = serviceCategory.icon;
            
            return (
              <div 
                key={serviceCategory.category}
                className="bg-background rounded-xl p-8 border border-border card-hover animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 ${serviceCategory.bgColor} rounded-xl flex items-center justify-center`}>
                    <CategoryIcon className={`h-8 w-8 ${serviceCategory.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{serviceCategory.category}</h3>
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-6">
                  {serviceCategory.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    
                    return (
                      <div 
                        key={service.title}
                        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 smooth-transition"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{service.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    variant="portfolio" 
                    className="w-full group"
                    onClick={scrollToContact}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-background rounded-xl p-8 border border-border max-w-4xl mx-auto shadow-sm">
            <h4 className="text-xl font-semibold mb-4">A Technical Partnership</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I work directly with teams to solve complex infrastructure challenges and simplify 
              their operational workflows. Whether you need to migrate to the cloud or improve 
              your existing CI/CD processes, I provide the technical expertise and reliability 
              to ensure your project succeeds.
            </p>
            <Button variant="hero" onClick={scrollToContact}>
              Let's Discuss Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;