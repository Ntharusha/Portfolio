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
  const [projects, setProjects] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome message with a slight delay
    setTimeout(() => {
      setHistory([
        { type: "output", content: "Welcome to Tharusha's Interactive Terminal v1.0.4" },
        { type: "output", content: "Type 'help' to see available commands." },
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

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: "input", content: `visitor@tharusha:~$ ${cmd}` }];

    if (trimmedCmd === "help") {
      newHistory.push({
        type: "output",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 my-2">
            <p><span className="text-green-400 font-bold w-16 inline-block">help</span> - Show commands</p>
            <p><span className="text-blue-400 font-bold w-16 inline-block">ls</span> - List sections</p>
            <p><span className="text-blue-400 font-bold w-16 inline-block">cat</span> - Read section</p>
            <p><span className="text-yellow-400 font-bold w-16 inline-block">clear</span> - Clear screen</p>
            <p><span className="text-purple-400 font-bold w-16 inline-block">whoami</span> - About user</p>
            <p><span className="text-purple-400 font-bold w-16 inline-block">neofetch</span> - System info</p>
            <p><span className="text-pink-400 font-bold w-16 inline-block">github</span> - Profile</p>
            <p><span className="text-red-400 font-bold w-16 inline-block">exit</span> - Reset session</p>
          </div>
        ),
      });
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
          <div className="flex flex-col sm:flex-row gap-4 my-2 font-mono text-xs sm:text-sm">
            <div className="text-primary leading-tight whitespace-pre">
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
              <p><span className="text-primary font-bold">visitor</span>@<span className="text-primary font-bold">tharusha-portfolio</span></p>
              <p>-------------------------</p>
              <p><span className="text-primary font-bold">OS:</span> PortfolioOS v1.2.0 stable</p>
              <p><span className="text-primary font-bold">Host:</span> React.js Web Runtime</p>
              <p><span className="text-primary font-bold">Kernel:</span> 6.12.0-tharusha-generic</p>
              <p><span className="text-primary font-bold">Uptime:</span> {Math.floor(performance.now() / 60000)} mins</p>
              <p><span className="text-primary font-bold">Shell:</span> bash-tharusha</p>
              <p><span className="text-primary font-bold">Theme:</span> Midnight Glass</p>
              <p><span className="text-primary font-bold">CPU:</span> Virtual Intel i9-14900K</p>
            </div>
          </div>
        ),
      });
    } else if (trimmedCmd === "version") {
      newHistory.push({ type: "output", content: "Tharusha Portfolio Shell v1.2.0 (Stable)" });
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
          { type: "output", content: "Welcome to Tharusha's Interactive Terminal v1.2.0" },
          { type: "output", content: "Type 'help' to see available commands." },
        ]);
      }, 1000);
    } else if (trimmedCmd === "github") {
      newHistory.push({ type: "output", content: "Opening GitHub Profile..." });
      window.open("https://github.com", "_blank");
    } else if (trimmedCmd === "") {
      // Do nothing for empty command
    } else {
      newHistory.push({ type: "error", content: `sh: command not found: ${trimmedCmd}. Type 'help' to see valid commands.` });
    }


    setHistory(newHistory);
    setInput("");
  };

  const suggestions = ["ls", "neofetch", "cat about", "cat skills", "projects", "help"];

  const handleSuggestionClick = (suggestion: string) => {
    handleCommand(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section id="terminal" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Interactive <span className="gradient-text">Terminal</span></h2>
          <p className="text-muted-foreground">For the power users: navigate my world through a terminal interface.</p>
        </div>

        <div 
          className={`bg-[#0d1117] rounded-lg border border-border shadow-2xl overflow-hidden font-mono text-sm sm:text-base smooth-transition ${
            isMaximized ? "fixed inset-4 z-50 h-[calc(100vh-32px)]" : "h-[450px]"
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <div className="ml-4 flex items-center space-x-2 text-muted-foreground opacity-60">
                <TerminalIcon size={14} />
                <span className="text-xs">visitor@tharusha: ~</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                className="hover:text-primary transition-colors"
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
          <div 
            ref={scrollRef}
            className="p-6 overflow-y-auto h-[calc(100%-40px)] terminal-scrollbar scroll-smooth"
          >
            <div className="space-y-1">
              {history.map((line, i) => (
                <div key={i} className={`${
                  line.type === "input" ? "text-blue-400" : 
                  line.type === "error" ? "text-red-400" : "text-gray-300"
                } leading-relaxed break-all whitespace-pre-line`}>
                  {line.content}
                </div>
              ))}
              
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-green-400 flex-shrink-0">visitor@tharusha:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-transparent focus:ring-0"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Commands Help */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground flex items-center mr-2">Quick Commands:</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/50 smooth-transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: #0d1117;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
      `}} />
    </section>
  );
};

export default InteractiveTerminal;
