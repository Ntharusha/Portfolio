import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sync the drawing-buffer size with the CSS layout size.
    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 m = u_mouse.xy / u_resolution.xy;
    
    // Adjust aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float time = u_time * 0.2;
    
    // Dark cyberpunk color scheme
    vec3 colorBg = vec3(0.05, 0.08, 0.08);
    vec3 colorPrimary = vec3(0.0, 0.95, 1.0);
    
    // Dynamic Grid System
    vec2 gridUv = centeredUv * 15.0;
    vec2 gridId = floor(gridUv);
    vec2 gridF = fract(gridUv) - 0.5;
    
    float gridLine = smoothstep(0.48, 0.5, max(abs(gridF.x), abs(gridF.y)));
    float gridPulse = sin(time + hash(gridId) * 6.28) * 0.5 + 0.5;
    
    // Slanted/Diagonal coordinates for conduits (30-degree tilt)
    float angle = 0.523; // ~30 degrees
    float c = cos(angle);
    float s = sin(angle);
    vec2 rotUv = vec2(centeredUv.x * c - centeredUv.y * s, centeredUv.x * s + centeredUv.y * c);
    
    // Energy Conduits (Moving waves)
    float conduits = 0.0;
    for(float i = 1.0; i < 5.0; i++) {
        float speed = i * 0.3;
        float freq = i * 2.0;
        float amp = 0.05 / i;
        conduits += amp / abs(sin(rotUv.x * freq + time * speed + m.x) * 0.5 - rotUv.y);
    }
    
    // Data "Pulses" (Flickering bits)
    float dataBits = smoothstep(0.9, 0.99, hash(gridId + floor(time * 2.0)));
    dataBits *= (1.0 - length(gridF) * 2.0);
    
    // Mouse Interaction (Glow)
    float mouseGlow = 0.15 / (length(uv - m) + 0.1);
    
    // Composition
    vec3 color = colorBg;
    color += colorPrimary * gridLine * gridPulse * 0.1;
    color += colorPrimary * conduits * 0.4;
    color += colorPrimary * dataBits * 0.2;
    color += colorPrimary * mouseGlow * 0.1;
    
    // Vignette
    float vignette = smoothstep(1.5, 0.5, length(centeredUv));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
}`;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth;
      const ny = 1.0 - event.clientY / window.innerHeight;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    };

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handleResize = () => {
      syncSize();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!resizeObserver) {
      window.addEventListener("resize", handleResize, { passive: true });
    }

    let animationFrameId: number;
    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Smooth scroll interpolation (easing)
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Sync animation progress with scroll position
      const scrollTime = currentScroll * 0.008;

      if (uTime) gl.uniform1f(uTime, scrollTime);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
