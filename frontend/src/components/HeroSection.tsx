import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import profileImage from "@/assets/02.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-gradient pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="gradient-text">Tharusha Bhashitha</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-light">
                DevOps Engineer & Systems Enthusiast
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Motivated and detail-oriented aspiring DevOps Engineer specializing in Infrastructure as Code (IaC) and CI/CD automation. Hands-on experience building cloud-native systems using AWS, Docker, and Terraform. Passionate about enhancing infrastructure reliability and streamlining deployment workflows through automation.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => scrollToSection("portfolio")}
                className="group"
              >
                View My Work
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => scrollToSection("contact")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">07+</div>
                <div className="text-sm text-muted-foreground">Tools Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2026</div>
                <div className="text-sm text-muted-foreground">Expected Graduation</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-card-hover">
                <img
                  src={profileImage}
                  alt="Tharusha Bhashitha"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary rounded-full opacity-30 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;