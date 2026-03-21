import { 
  Server, 
  Code, 
  GitBranch, 
  Cloud, 
  Container, 
  Palette, 
  Network,
  Terminal,
  Layers
} from "lucide-react";

const SkillsSection = () => {
  const technicalSkills = [
    {
      icon: Terminal,
      title: "Linux System Administration",
      description: "Advanced command-line expertise and system configuration",
      level: 90
    },
    {
      icon: Code,
      title: "Automation Programming",
      description: "Bash scripting and Python for system automation",
      level: 85
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Git workflows and collaborative development",
      level: 88
    },
    {
      icon: Container,
      title: "Containerization",
      description: "Docker containers and orchestration basics",
      level: 75
    },
    {
      icon: Cloud,
      title: "Cloud Platforms",
      description: "AWS fundamentals and cloud service deployment",
      level: 70
    },
    {
      icon: Network,
      title: "Networking",
      description: "Network protocols and infrastructure basics",
      level: 80
    },
    {
      icon: Layers,
      title: "CI/CD Concepts",
      description: "Continuous integration and deployment pipelines",
      level: 75
    },
    {
      icon: Server,
      title: "DevOps Tools",
      description: "Infrastructure as Code and monitoring",
      level: 78
    }
  ];

  const creativeSkills = [
    {
      icon: Palette,
      title: "Logo Design",
      description: "Brand identity and visual logo creation",
      level: 92
    },
    {
      icon: Palette,
      title: "Flyer Design",
      description: "Marketing materials and promotional graphics",
      level: 88
    },
    {
      icon: Palette,
      title: "Social Media Graphics",
      description: "Engaging content for digital platforms",
      level: 90
    }
  ];

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
    const Icon = skill.icon;
    
    return (
      <div 
        className="bg-card rounded-lg p-6 border border-border card-hover"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-2">{skill.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
            
            {/* Skill Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proficiency</span>
                <span className="text-primary font-medium">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent-gradient h-2 rounded-full smooth-transition"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A versatile combination of technical prowess and creative excellence
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            <span className="gradient-text">Technical Skills</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Creative Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">
            <span className="gradient-text">Creative Skills</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {creativeSkills.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg p-8 border border-border max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">Why Choose Me?</h4>
            <p className="text-muted-foreground leading-relaxed">
              My unique combination of technical DevOps expertise and creative design skills allows me to 
              deliver comprehensive solutions. I don't just build systems – I create experiences that are 
              both functional and visually appealing. Whether you need robust automation, reliable cloud 
              infrastructure, or stunning graphic designs, I bring passion and precision to every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;