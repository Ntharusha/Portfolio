import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { API_URL } from "@/lib/api-config";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string | JSX.Element;
}

const InteractiveTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Initializing terminal..." },
  ]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome message with a slight delay
    setTimeout(() => {
      setHistory([
        { type: "output", content: "Welcome to Tharusha's Interactive Terminal v1.2.5" },
        { type: "output", content: "Type 'help' to view commands. Type 'devops' to open the DevOps Learning Hub!" },
      ]);
    }, 500);

    // Fetch live projects for the terminal
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Terminal project fetch error:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runSimulation = (lines: { type: "input" | "output" | "error"; content: string }[]) => {
    setIsSimulating(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < lines.length) {
        setHistory((prev) => [...prev, lines[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "\nSimulation execution complete. Ready for next command." },
        ]);
      }
    }, 450);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: "input", content: `visitor@tharusha:~$ ${cmd}` }];

    if (isSimulating) {
      newHistory.push({ type: "error", content: "Terminal is currently busy running a simulation. Please wait..." });
      setHistory(newHistory);
      setInput("");
      return;
    }

    if (trimmedCmd === "help") {
      newHistory.push({
        type: "output",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 my-2 font-mono-dev text-xs">
            <p><span className="text-[#00f2ff] font-bold w-24 inline-block">devops</span> - Open DevOps Learning Hub</p>
            <p><span className="text-[#4AF626] font-bold w-24 inline-block">help</span> - Show commands</p>
            <p><span className="text-[#00f2ff] font-bold w-24 inline-block">ls</span> - List sections</p>
            <p><span className="text-[#00f2ff] font-bold w-24 inline-block">cat [sec]</span> - Read section</p>
            <p><span className="text-[#FFB800] font-bold w-24 inline-block">clear</span> - Clear screen</p>
            <p><span className="text-[#00f2ff] font-bold w-24 inline-block">whoami</span> - About user</p>
            <p><span className="text-[#00f2ff] font-bold w-24 inline-block">neofetch</span> - System info</p>
            <p><span className="text-[#FFB800] font-bold w-24 inline-block">github</span> - Profile</p>
          </div>
        ),
      });
    } else if (trimmedCmd === "devops") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-2 my-2 font-mono-dev text-xs border border-[#00f2ff]/20 p-4 rounded bg-[#0d1515]">
            <p className="text-[#00f2ff] font-bold">=== DEVOPS INTERACTIVE LEARNING HUB ===</p>
            <p className="text-[#b9cacb] leading-relaxed">
              Explore DevOps concepts, automation pipelines, and tools interactively!
            </p>
            <p className="text-[#00f2ff] mt-2 font-bold">// CONCEPTS</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">learn ci/cd</span> - Continuous Integration (Jenkins, GitHub Actions)</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">learn iac</span> - Infrastructure as Code (Terraform, Ansible)</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">learn k8s</span> - Containers & Orchestration (Docker, Kubernetes)</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">learn gitops</span> - GitOps Deployment (Argo CD)</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">learn monitor</span> - Observability (Prometheus, Grafana)</p>
            
            <p className="text-[#FFB800] mt-2 font-bold">// LIVE PIPELINE SIMULATORS</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">run ci/cd</span> - Trigger simulated Jenkins Docker build loop</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">run iac</span> - Run a simulated Terraform resource provision</p>
            <p className="pl-4"><span className="text-white font-bold w-28 inline-block">run gitops</span> - Sync a cluster deployment via Argo CD</p>
          </div>
        ),
      });
    } else if (trimmedCmd === "learn ci/cd") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-1.5 font-mono text-xs text-[#b9cacb]">
            <p className="text-[#00f2ff] font-bold">--- CI/CD & PIPELINE AUTOMATION ---</p>
            <p><span className="text-[#00f2ff]">Stack:</span> Jenkins, GitHub Actions, Scripting</p>
            <p className="leading-relaxed">
              Continuous Integration (CI) automatically builds, lints, and runs tests whenever code is pushed.
              Continuous Delivery (CD) automates release delivery. This eliminates manual builds and catches errors early.
            </p>
            <p className="text-[#FFB800] font-semibold">Tip: Run 'run ci/cd' to simulate a Docker build and push pipeline!</p>
          </div>
        ),
      });
    } else if (trimmedCmd === "learn iac") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-1.5 font-mono text-xs text-[#b9cacb]">
            <p className="text-[#00f2ff] font-bold">--- INFRASTRUCTURE AS CODE (IaC) ---</p>
            <p><span className="text-[#00f2ff]">Stack:</span> Terraform, OpenTofu, Ansible</p>
            <p className="leading-relaxed">
              Instead of manually creating cloud servers, IaC lets you describe infrastructure as declaration files.
              Terraform provisions AWS networks/servers, and Ansible configures software on them dynamically.
            </p>
            <p className="text-[#FFB800] font-semibold">Tip: Run 'run iac' to see Terraform provision cloud servers!</p>
          </div>
        ),
      });
    } else if (trimmedCmd === "learn k8s") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-1.5 font-mono text-xs text-[#b9cacb]">
            <p className="text-[#00f2ff] font-bold">--- CONTAINERS & ORCHESTRATION ---</p>
            <p><span className="text-[#00f2ff]">Stack:</span> Docker, Docker Compose, Kubernetes (K8s)</p>
            <p className="leading-relaxed">
              Docker wraps applications into virtual containers that run anywhere reliably.
              Kubernetes manages clusters of these containers, handling auto-scaling, health monitoring, and network routing automatically.
            </p>
          </div>
        ),
      });
    } else if (trimmedCmd === "learn gitops") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-1.5 font-mono text-xs text-[#b9cacb]">
            <p className="text-[#00f2ff] font-bold">--- GITOPS CONTINUOUS DEPLOYMENT ---</p>
            <p><span className="text-[#00f2ff]">Stack:</span> Argo CD, Kubernetes Manifests</p>
            <p className="leading-relaxed">
              GitOps uses Git repositories as the single source of truth for deployments.
              Argo CD continuously monitors Git and pulls updates straight to Kubernetes, ensuring the live system always matches the configurations in repository.
            </p>
            <p className="text-[#FFB800] font-semibold">Tip: Run 'run gitops' to see Argo CD synchronize cluster manifests!</p>
          </div>
        ),
      });
    } else if (trimmedCmd === "learn monitor") {
      newHistory.push({
        type: "output",
        content: (
          <div className="space-y-1.5 font-mono text-xs text-[#b9cacb]">
            <p className="text-[#00f2ff] font-bold">--- OBSERVABILITY & MONITORING ---</p>
            <p><span className="text-[#00f2ff]">Stack:</span> Prometheus, Grafana, Node Exporter</p>
            <p className="leading-relaxed">
              Observability keeps track of system health. Prometheus collects metrics (CPU/RAM load, request latency)
              at regular intervals, while Grafana organizes these metrics into beautiful dashboard charts for system reliability alerts.
            </p>
          </div>
        ),
      });
    } else if (trimmedCmd === "run ci/cd") {
      setHistory(newHistory);
      setInput("");
      runSimulation([
        { type: "output", content: "$ git push origin main" },
        { type: "output", content: "Counting objects: 100% (5/5), done." },
        { type: "output", content: "Writing objects: 100% (3/3), 296 bytes | 296.00 KiB/s, done." },
        { type: "output", content: "To github.com:Ntharusha/ApexPOS.git\n   98b50e2..7b64e5e  main -> main" },
        { type: "output", content: "\n[Jenkins] Webhook received. Starting Build Job #78..." },
        { type: "output", content: "[Jenkins] [Stage 1/4] Running ESLint check... Done (Pass)" },
        { type: "output", content: "[Jenkins] [Stage 2/4] Executing unit tests (Jest)... 14/14 tests passed." },
        { type: "output", content: "[Jenkins] [Stage 3/4] Building Docker container image..." },
        { type: "output", content: "   --> Docker build context: 14.5MB\n   --> STEP 1: FROM node:20-alpine\n   --> STEP 2: RUN npm ci\n   --> STEP 3: COPY . .\n   --> Tagging image as ntharusha/apexpos:latest" },
        { type: "output", content: "[Jenkins] [Stage 4/4] Authenticating with registry and pushing..." },
        { type: "output", content: "   --> Pushing layer 98b50e2... Done\n   --> Pushing layer 7b64e5e... Done" },
        { type: "output", content: "✔ [Jenkins] SUCCESS: Build Pipeline Job #78 finished in 18s." },
      ]);
      return;
    } else if (trimmedCmd === "run iac") {
      setHistory(newHistory);
      setInput("");
      runSimulation([
        { type: "output", content: "$ terraform init" },
        { type: "output", content: "Initializing modules...\nInitializing provider plugins (hashicorp/aws)..." },
        { type: "output", content: "✔ Terraform has been successfully initialized!" },
        { type: "output", content: "\n$ terraform plan" },
        { type: "output", content: "Terraform will perform the following actions:\n  + aws_instance.prod_web_server will be created" },
        { type: "output", content: "Plan: 1 to add, 0 to change, 0 to destroy." },
        { type: "output", content: "\n$ terraform apply --auto-approve" },
        { type: "output", content: "aws_instance.prod_web_server: Creating..." },
        { type: "output", content: "aws_instance.prod_web_server: Still creating... (5s elapsed)" },
        { type: "output", content: "aws_instance.prod_web_server: Creation complete [id=i-00f2ff1122aa]" },
        { type: "output", content: "\n✔ Apply complete! Resources: 1 added, 0 changed, 0 destroyed." },
      ]);
      return;
    } else if (trimmedCmd === "run gitops") {
      setHistory(newHistory);
      setInput("");
      runSimulation([
        { type: "output", content: "[ArgoCD] Fetching status of target cluster resources..." },
        { type: "output", content: "State: OutOfSync (Git Revision: 7b64e5 != Active Revision: 98b50e)" },
        { type: "output", content: "\n[ArgoCD] Triggering Sync Loop..." },
        { type: "output", content: "  --> Pruning legacy pods..." },
        { type: "output", content: "  --> Applying configuration deployment.yaml..." },
        { type: "output", content: "  --> Rolling out deployment/apex-pos-api..." },
        { type: "output", content: "  --> Scaling replica set apex-pos-api-7b64e5... 0 -> 3" },
        { type: "output", content: "  --> Waiting for container health checks..." },
        { type: "output", content: "✔ Sync complete! Cluster state is Synced.\nStatus: Healthy." },
      ]);
      return;
    } else if (trimmedCmd === "ls") {
      newHistory.push({ type: "output", content: "about  skills  projects  contact  experience" });
    } else if (trimmedCmd === "whoami") {
      newHistory.push({ type: "output", content: "guest@portfolio: A curious visitor exploring Tharusha's work." });
    } else if (trimmedCmd === "date") {
      newHistory.push({ type: "output", content: new Date().toString() });
    } else if (trimmedCmd === "neofetch") {
      newHistory.push({
        type: "output",
        content: (
          <div className="flex flex-col sm:flex-row gap-4 my-2 font-mono-dev text-xs">
            <div className="text-[#00f2ff] leading-tight whitespace-pre font-bold">
              {`   ⣴⣶⣦⡀
  ⢻⣿⣿⣿⣿
   ⢹⣿⣿⣿
    ⣼⣿⣿
   ⣼⣿⣿⣿
  ⢰⣿⣿⣿⣿⣷
  ⢈⠻⣿⣿⣿⣿
   ⠙⠶⠶⠶⠶`}
            </div>
            <div>
              <p><span className="text-[#00f2ff] font-bold">visitor</span>@<span className="text-[#00f2ff] font-bold">tharusha-portfolio</span></p>
              <p className="text-[#2D2D30]">-------------------------</p>
              <p><span className="text-[#00f2ff] font-bold">OS:</span> PortfolioOS v1.2.5 stable</p>
              <p><span className="text-[#00f2ff] font-bold">Host:</span> React.js Web Runtime</p>
              <p><span className="text-[#00f2ff] font-bold">Kernel:</span> 6.12.0-tharusha-generic</p>
              <p><span className="text-[#00f2ff] font-bold">Uptime:</span> {Math.floor(performance.now() / 60000)} mins</p>
              <p><span className="text-[#00f2ff] font-bold">Shell:</span> bash-tharusha</p>
              <p><span className="text-[#00f2ff] font-bold">Theme:</span> Obsidian Flux</p>
              <p><span className="text-[#00f2ff] font-bold">CPU:</span> Virtual Intel i9-14900K</p>
            </div>
          </div>
        ),
      });
    } else if (trimmedCmd === "version") {
      newHistory.push({ type: "output", content: "Tharusha Portfolio Shell v1.2.5 (Stable)" });
    } else if (trimmedCmd === "cat about") {
      newHistory.push({
        type: "output",
        content: "I am a DevOps enthusiast and Systems Engineering student based in Sri Lanka. I specialize in building automated deployment pipelines, managing Linux infrastructure, and optimizing cloud-native environments.",
      });
    } else if (trimmedCmd === "cat skills") {
      newHistory.push({
        type: "output",
        content: "Technical Stack: Linux (Ubuntu/Debian), Docker, Kubernetes, AWS, Terraform, GitHub Actions. Programming: Python, Bash, Node.js.",
      });
    } else if (trimmedCmd === "cat projects" || trimmedCmd === "projects") {
      if (projects.length > 0) {
        const projectList = projects.slice(0, 5).map(p => `- ${p.title} (${p.category})`).join("\n");
        newHistory.push({ type: "output", content: `My Latest Projects:\n${projectList}` });
      } else {
        newHistory.push({ type: "output", content: "Fetching latest projects... No custom projects found. Check my GitHub for latest automation scripts." });
      }
    } else if (trimmedCmd === "cat contact" || trimmedCmd === "contact") {
      newHistory.push({
        type: "output",
        content: "Email: ntb069@gmail.com | LinkedIn: Tharusha Bhashitha | Location: Vavuniya, Sri Lanka",
      });
    } else if (trimmedCmd === "sudo") {
      newHistory.push({ type: "error", content: "Nice try! This incident will be reported. (Not really, but you don't have root permissions yet 😉)" });
    } else if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (trimmedCmd === "exit") {
      newHistory.push({ type: "output", content: "Session terminated. Re-initializing..." });
      setTimeout(() => {
        setHistory([
          { type: "output", content: "Welcome to Tharusha's Interactive Terminal v1.2.5" },
          { type: "output", content: "Type 'help' to see available commands." },
        ]);
      }, 1000);
    } else if (trimmedCmd === "github") {
      newHistory.push({ type: "output", content: "Opening GitHub Profile..." });
      window.open("https://github.com/Ntharusha", "_blank");
    } else if (trimmedCmd === "") {
      // Do nothing for empty command
    } else {
      newHistory.push({ type: "error", content: `sh: command not found: ${trimmedCmd}. Type 'help' to see valid commands.` });
    }

    setHistory(newHistory);
    setInput("");
  };

  const suggestions = ["devops", "neofetch", "projects", "help", "clear"];

  const handleSuggestionClick = (suggestion: string) => {
    handleCommand(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section id="terminal" className="section-padding bg-[#0d1515] relative overflow-hidden">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-[#00f2ff] uppercase tracking-widest">// System Console</p>
          <h2 className="font-mono text-2xl text-[#dce4e5] mt-2 mb-4 uppercase font-bold">
            Interactive <span className="text-[#00f2ff] drop-shadow-[0_0_10px_rgba(0,242,255,0.2)]">Terminal</span>
          </h2>
          <p className="font-sans text-sm text-[#b9cacb] max-w-md mx-auto">
            For the power users: learn DevOps concepts and run live pipeline simulations in the shell.
          </p>
        </div>

        <div
          className={`bg-[#0d1515] border border-[#2D2D30] p-0 overflow-hidden font-mono-dev text-sm smooth-transition flex flex-col ${
            isMaximized ? "fixed inset-4 z-50 h-[calc(100vh-32px)]" : "h-[400px]"
          }`}
          style={{
            boxShadow: "0 0 40px rgba(0, 242, 255, 0.05)",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="bg-[#151d1e] px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid #2D2D30" }}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#4AF626]" />
              <div className="ml-4 flex items-center space-x-2 text-[#849495] opacity-80">
                <TerminalIcon size={14} className="text-[#00f2ff]" />
                <span className="text-xs">visitor@tharusha: ~</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-[#849495]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="hover:text-[#00f2ff] transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button className="hover:text-red-500 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div ref={scrollRef} className="p-5 overflow-y-auto flex-1 terminal-scrollbar scroll-smooth bg-[#0d1515]/90">
            <div className="space-y-1">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.type === "input"
                      ? "text-[#00f0ff]"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-[#b9cacb]"
                  } leading-relaxed break-all whitespace-pre-line`}
                >
                  {line.content}
                </div>
              ))}

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-[#4AF626] flex-shrink-0">visitor@tharusha:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-[#dce4e5] placeholder-transparent focus:ring-0 focus:outline-none p-0"
                  spellCheck="false"
                  autoComplete="off"
                  disabled={isSimulating}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Commands Help */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-xs text-[#849495] flex items-center mr-2 font-mono-dev">Quick Commands:</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-xs rounded-full bg-[#00f2ff]/5 border border-[#00f2ff]/20 text-[#00f2ff] hover:bg-[#00f2ff]/10 hover:border-[#00f2ff]/50 smooth-transition font-mono-dev"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: #0d1515;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: #2D2D30;
          border-radius: 4px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00f0ff50;
        }
      `,
        }}
      />
    </section>
  );
};

export default InteractiveTerminal;
