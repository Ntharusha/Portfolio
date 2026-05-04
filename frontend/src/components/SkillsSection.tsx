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
      icon: Cloud,
      title: "Cloud Computing",
      description: "AWS (EC2, S3, IAM basics)",
      level: 70
    },
    {
      icon: Layers,
      title: "Infrastructure as Code",
      description: "Terraform, OpenTofu",
      level: 80
    },
    {
      icon: Container,
      title: "Containerization & Orchestration",
      description: "Docker, Docker Compose, Kubernetes (Basic)",
      level: 75
    },
    {
      icon: Server,
      title: "CI/CD & Automation",
      description: "Jenkins, GitHub Actions, Argo CD, Ansible",
      level: 80
    },
    {
      icon: Network,
      title: "Monitoring & Logging",
      description: "Prometheus, Grafana, Linux system monitoring tools",
      level: 75
    },
    {
      icon: Terminal,
      title: "Operating Systems",
      description: "Linux (Ubuntu, System Administration, CLI)",
      level: 90
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Git, GitHub",
      level: 85
    },
    {
      icon: Code,
      title: "Scripting & Backend",
      description: "Python, Bash, Node.js",
      level: 80
    },
    {
      icon: Network,
      title: "Networking",
      description: "TCP/IP, DNS, Troubleshooting",
      level: 75
    }
  ];

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
    const Icon = skill.icon;
    
    return (
      <div 
        className="bg-card rounded-lg p-6 border border-border card-hover animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
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
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
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
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of technical skills focused on systems automation, reliability, and cloud infrastructure.
          </p>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technicalSkills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-xl p-8 border border-border max-w-4xl mx-auto shadow-sm">
            <h4 className="text-xl font-semibold mb-4">Commitment to Quality</h4>
            <p className="text-muted-foreground leading-relaxed">
              With a deep focus on DevOps principles and systems engineering, I deliver robust, scalable, 
              and automated solutions. My expertise spans across Linux administration, cloud infrastructure, 
              and CI/CD pipelines, ensuring high availability and efficiency for modern technical projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;