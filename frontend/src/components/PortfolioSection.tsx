import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Facebook } from "lucide-react";
import { API_URL } from "@/lib/api-config";

interface ProjectItem {
  id?: string | number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  projectUrl?: string;
}

const PortfolioSection = () => {
  const [portfolioItems, setPortfolioItems] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Technical projects showcasing my expertise in DevOps and Automation
  const staticItems = [
    {
      id: 1,
      title: "ApexPOS",
      category: "Cloud-Native SaaS POS System",
      description: "Architected a cloud-native POS system using Node.js and MongoDB Atlas deployed on AWS. Automated infrastructure provisioning using Terraform and configured server environments with Ansible. Implemented a robust CI/CD pipeline using Jenkins and Argo CD for automated deployment. Planned and implementing Kubernetes (K8s) for container orchestration, scalability, and high availability. Containerized application modules using Docker.",
      tags: ["AWS", "Terraform", "Jenkins", "Argo CD", "Kubernetes", "Docker", "Node.js", "MongoDB"],
      projectUrl: "https://github.com/Ntharusha/ApexPOS"
    },
    {
      id: 2,
      title: "Lankan Premiere",
      category: "Movie Ticketing System",
      description: "Developed a full-stack ticketing system using React, Node.js, and MongoDB. Deployed scalable infrastructure on AWS using Terraform scripts. Streamlined deployment processes through integrated CI/CD pipelines. Integrated basic monitoring using Prometheus and Grafana to track system performance.",
      tags: ["React", "Node.js", "MongoDB", "AWS", "Terraform", "Prometheus", "Grafana"],
      projectUrl: "https://github.com/Ntharusha/Lankan-Primire"
    },
    {
      id: 3,
      title: "DevOps Study Companion",
      category: "Full-Stack Web App",
      description: "Built a full-stack tracking tool with React and Node.js to monitor DevOps learning milestones. Configured automated workflows using GitHub Actions for continuous integration. Leveraged Terraform for AWS infrastructure management and Docker for application portability. Explored basic monitoring concepts for application health tracking.",
      tags: ["React", "Node.js", "GitHub Actions", "Terraform", "Docker", "AWS"],
      projectUrl: "https://github.com/Ntharusha/DevOps-Study-Companion"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Filter out projects that might be labeled graphic design from the DB
            const filteredData = data.filter((p: any) => 
              !p.category?.toLowerCase().includes("design") && 
              !p.category?.toLowerCase().includes("graphic")
            );
            setPortfolioItems([...filteredData, ...staticItems]);
          } else {
            setPortfolioItems(staticItems);
          }
        } else {
          setPortfolioItems(staticItems);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setPortfolioItems(staticItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my projects in systems automation, cloud infrastructure, and DevOps engineering.
          </p>
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id || index}
                className="bg-card rounded-xl overflow-hidden border border-border card-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium px-4 text-center">{item.title}</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => item.projectUrl && window.open(item.projectUrl, '_blank')}
                    >
                      {item.projectUrl ? "View Repository" : "View Details"}
                    </Button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary font-medium">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-xl p-8 border border-border max-w-4xl mx-auto shadow-sm">
            <h4 className="text-xl font-semibold mb-4">Interested in Collaboration?</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm always looking for opportunities to contribute to innovative technical projects 
              and help teams improve their development lifecycle. Let's talk about how I can 
              bring my DevOps and automation skills to your next endeavor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;