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
      category: "DevOps & Automation",
      icon: Settings,
      color: "text-primary",
      bgColor: "bg-primary/10",
      services: [
        {
          title: "System Administration",
          description: "Linux server setup, configuration, and maintenance with security best practices",
          icon: Server
        },
        {
          title: "Automation Scripts",
          description: "Custom Bash and Python scripts for task automation and system optimization",
          icon: Code
        },
        {
          title: "Cloud Setup",
          description: "AWS deployment, configuration, and basic infrastructure management",
          icon: Cloud
        }
      ]
    },
    {
      category: "Graphic Design",
      icon: Palette,
      color: "text-accent",
      bgColor: "bg-accent/10",
      services: [
        {
          title: "Logo Design",
          description: "Professional brand identity creation with modern, memorable logo designs",
          icon: Image
        },
        {
          title: "Marketing Materials",
          description: "Eye-catching flyers, brochures, and promotional graphics for your business",
          icon: Palette
        },
        {
          title: "Social Media Graphics",
          description: "Engaging visual content optimized for various social media platforms",
          icon: Image
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
            Comprehensive solutions bridging technical excellence and creative design
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((serviceCategory, categoryIndex) => {
            const CategoryIcon = serviceCategory.icon;
            
            return (
              <div 
                key={serviceCategory.category}
                className="bg-background rounded-xl p-8 border border-border card-hover"
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
          <div className="bg-background rounded-xl p-8 border border-border max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">Collaborative Approach</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I love working directly with clients to understand what makes their projects special. 
              Whether you need to streamline your development process or build a memorable brand identity, 
              I'll work closely with you to create solutions that fit your unique needs and vision. 
              Let's build something amazing together!
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