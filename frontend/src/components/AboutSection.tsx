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
            Driven by curiosity and powered by a passion for building reliable technology systems
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
              What really excites me is finding the most efficient way to automate complex processes 
              and ensure system stability. I love that I can leverage my mathematical background to 
              solve deep technical problems, whether it's through code or system configuration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether I'm setting up automated deployment pipelines or building cloud-native 
              applications, I approach everything with the same mindset: make it scalable, 
              resilient, and efficient for the teams who rely on it.
            </p>
          </div>

          {/* Education & Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Education & Certifications</h3>
            
            <div className="bg-background rounded-lg p-6 border border-border mt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">BSc in Applied Mathematics and Computing</h4>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>University of Vavuniya | 2023 – Present</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border mt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">G.C.E. Advanced Level (A/L)</h4>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Gankanda Central College | 2020/2021</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border mt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">G.C.E. Ordinary Level (O/L)</h4>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Vidyakara Isuru School | 2017</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <h5 className="font-semibold text-primary mb-2">Certifications</h5>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Ultimate DevOps Bootcamp | School of Devops (Mar 2026)</li>
                  <li>Ultimate Terraform & OpenTofu Bootcamp | School of Devops (Apr 2026)</li>
                  <li>CI/CD with Jenkins and Docker | School of Devops (Feb 2026)</li>
                  <li>AWS Certified Cloud Practitioner (CLF-C02) | In Progress</li>
                  <li>Supercource – Ultimate Advanced Kubernetes Bootcamp | School of Devops | In Progress</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;