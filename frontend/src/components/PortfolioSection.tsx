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

  // My graphic design portfolio showcasing real projects I've created
  const staticItems = [
    {
      id: 1,
      title: "University Tech Club Logo",
      category: "Logo Design",
      description: "Modern logo design for our university's technology club that represents innovation and community",
      tags: ["University", "Tech Club", "Brand Identity"]
    },
    {
      id: 2,
      title: "Campus Event Posters",
      category: "Print Design",
      description: "Eye-catching posters for tech workshops and coding competitions at university",
      tags: ["Event", "Poster", "Campus"]
    },
    {
      id: 3,
      title: "Social Media Brand Kit",
      category: "Digital Graphics",
      description: "Complete social media package with templates and graphics for consistent branding",
      tags: ["Social Media", "Branding", "Templates"]
    },
    {
      id: 4,
      title: "Local Cafe Menu Design",
      category: "Brand Identity",
      description: "Warm, inviting menu design for a neighborhood cafe with custom illustrations",
      tags: ["Menu", "Cafe", "Illustration"]
    },
    {
      id: 5,
      title: "Developer Portfolio Graphics",
      category: "UI Design",
      description: "Clean, professional graphics and icons for developer portfolios and resumes",
      tags: ["Developer", "Portfolio", "Icons"]
    },
    {
      id: 6,
      title: "Tech Workshop Materials",
      category: "Educational Design",
      description: "Engaging presentation slides and handouts for programming workshops I've conducted",
      tags: ["Education", "Workshop", "Presentation"]
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPortfolioItems([...data, ...staticItems]);
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
            My <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A curated collection of graphic design projects showcasing creativity and technical skill
          </p>
          
          {/* Link to Facebook Portfolio */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="group"
              onClick={() => window.open('https://web.facebook.com/ArtwaveInnovations', '_blank')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Visit Artwave Innovations
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </div>
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
                      <span className="text-muted-foreground font-medium">{item.title}</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => item.projectUrl && window.open(item.projectUrl, '_blank')}
                    >
                      {item.projectUrl ? "View Project" : "View Details"}
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
          <div className="bg-card rounded-xl p-8 border border-border max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">Like What You See?</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              These are just a few examples of my graphic design work. I'm always excited to take on 
              new creative challenges and bring fresh ideas to life. Let's collaborate on your next 
              visual project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero"
                onClick={() => window.open('https://web.facebook.com/ArtwaveInnovations', '_blank')}
              >
                <Facebook className="mr-2 h-4 w-4" />
                View My Page
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;