import { GraduationCap, MapPin, Calendar } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Driven by curiosity and powered by passion for technology and design
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Personal Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              My journey into technology started with curiosity about how things work behind the scenes. 
              I'm currently studying Applied Mathematics and Computing at the University of Vavuniya, 
              where I'm learning to combine mathematical thinking with practical software development skills.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What really excites me is finding the sweet spot between technical precision and creative 
              expression. I love that I can spend my morning optimizing server configurations and my 
              afternoon designing beautiful graphics - both require problem-solving, just in different ways!
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether I'm setting up automated deployment pipelines or creating visual identities for 
              projects, I approach everything with the same mindset: make it work beautifully, make it 
              look beautiful, and make the experience enjoyable for everyone involved.
            </p>
          </div>

          {/* Education & Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Education & Background</h3>
            
            <div className="bg-background rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">BSc Applied Mathematics and Computing</h4>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>University of Vavuniya, Sri Lanka</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Expected Graduation: 2026</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focusing on mathematical foundations for computing, algorithmic thinking, 
                    and practical applications in software development and system design.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <h5 className="font-semibold text-primary mb-2">Technical Focus</h5>
                <p className="text-sm text-muted-foreground">
                  Linux system administration, automation programming, and cloud technologies
                </p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <h5 className="font-semibold text-primary mb-2">Creative Skills</h5>
                <p className="text-sm text-muted-foreground">
                  Logo design, flyer creation, and social media content development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;