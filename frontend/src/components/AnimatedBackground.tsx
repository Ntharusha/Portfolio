import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      {/* Dynamic Blobs */}
      <div className="absolute top-[10%] -left-20 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] -right-20 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-accent/15 rounded-full mix-blend-screen filter blur-[90px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[110px] animate-blob animation-delay-4000"></div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Radial Mask for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)]"></div>
    </div>
  );
};

export default AnimatedBackground;
