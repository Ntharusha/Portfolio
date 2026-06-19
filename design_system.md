# Design System: Cybernetic Systems

This design system is engineered to project the precision of DevOps and the architectural depth of Systems Engineering. It targets high-stakes technical environments—SaaS founders, engineering leads, and enterprise recruiters—who value reliability and technical mastery.

## Brand & Style
The visual style is a fusion of **Glassmorphism** and **Futuristic Minimalism**. It utilizes a "Deep Space" canvas to create an infinite, immersive environment where information surfaces through luminous, semi-transparent layers. The emotional response should be one of "controlled power"—highly technical, structured, and cutting-edge, yet clean enough to ensure architectural clarity.

### Key Attributes:
- **Atmospheric:** Uses subtle blurs and gradients to create a sense of three-dimensional space.
- **Precision-Driven:** Monospaced accents and sharp data visualization reflect a developer-centric focus.
- **Kinetic:** High-fidelity motion transitions simulate a high-performance operating system interface.

## Colors
This design system operates exclusively in a **dark mode** environment to minimize eye strain and maximize the "glowing" effect of technical components.

- **Background:** `#0d1515` (Near-black / Deep Space canvas)
- **Primary (Electric Cyan):** `#00f2ff` — Used for critical actions, interactive states, and glowing accents. It represents the "active signal" within the system.
- **Secondary (Neon Purple):** `#7000ff` — A subtle secondary accent used for data visualization gradients and depth-based background glows to prevent a flat aesthetic.
- **Neutral (Slate & Deep Space):** Near-black `#0a0a0c` for infinite contrast; Slate neutral (`#849495`, `#b9cacb`) for readable texture.
- **Functional Colors:** Terminal Green (`#10b981`) and Error Red (`#ff4b4b`) are reserved strictly for system status updates and validation feedback.

### Color Tokens:
```json
{
  "background": "#0d1515",
  "deep-space": "#0a0a0c",
  "surface": "#0d1515",
  "surface_container": "#192122",
  "surface_container_high": "#232b2c",
  "surface_container_highest": "#2e3637",
  "surface_container_low": "#151d1e",
  "surface_container_lowest": "#080f10",
  "on_surface": "#dce4e4",
  "on_surface_variant": "#b9cacb",
  "primary": "#e1fdff",
  "primary_container": "#00f2ff",
  "secondary": "#d1bcff",
  "secondary_container": "#7000ff",
  "outline": "#849495",
  "outline_variant": "#3a494b",
  "terminal-green": "#10b981",
  "error-red": "#ff4b4b"
}
```

## Typography
The typography strategy leverages the contrast between **Inter** (for human readability) and **JetBrains Mono** (for technical authority).

- **Headlines:** Use JetBrains Mono to evoke the feeling of a code editor or a command-line interface. Use tight letter spacing for large display text to maintain a "high-tech" density.
- **Body:** Use Inter for all long-form content. Its neutral, humanist character balances the coldness of the mono fonts, ensuring the portfolio feels accessible and professional.
- **Labels & Metadata:** Always use JetBrains Mono in uppercase with slight tracking (letter spacing) for a "system-level" aesthetic. This is ideal for tags, timestamps, and technical specs.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on a 12-column architecture. 

- **Density:** Spacing is tight and mathematical, using a 4px base unit. This reflects the precision required in DevOps.
- **Safe Margins:** Large horizontal margins on desktop (80px+) create a cinematic, widescreen feel, focusing the user's attention on the central "console."
- **Mobile Reflow:** On mobile devices, the 12-column grid collapses to a single column with a 20px margin. Complex cards (like technical expertise) should transform into a scrollable horizontal carousel or a stacked list.
- **The "Terminal" Layout:** Frequently use "fixed-height" containers for code blocks or terminal simulations to maintain a structured, dashboard-like feel.

## Elevation & Depth
Depth is created through **Glassmorphism** rather than traditional drop shadows.

- **Background Layers:** Use subtle mesh gradients in the background (blending Deep Space black with hints of Electric Cyan and Purple at 5% opacity) to create atmospheric depth.
- **Surface Containers:** Surfaces use a semi-transparent white or black fill (3-5%) with a `backdrop-filter: blur(12px)`.
- **Glowing Borders:** Instead of shadows, use a 1px solid border at 10% opacity. For "active" elements, use a linear gradient border that transitions from Electric Cyan to transparent, creating a "edge-light" effect.
- **Active Elevation:** When an element is hovered, increase the border opacity and add a subtle cyan outer glow (`box-shadow: 0 0 15px rgba(0, 242, 255, 0.3)`).

## Shapes
The shape language is **Soft (0.25rem)**.

- **Standard Elements:** Use a consistent 4px (0.25rem) radius. This provides a modern feel while maintaining a sense of "engineered" sharpness.
- **Cards & Sections:** Larger containers can use up to 8px (0.5rem) to distinguish them from smaller UI widgets.
- **Interactive Triggers:** Buttons and inputs should strictly follow the 4px rule to maintain a cohesive, tool-like appearance. Avoid fully rounded/pill shapes as they feel too "consumer-soft" for a DevOps system.

## Components
- **Buttons:** Primary buttons feature a solid Electric Cyan background with JetBrains Mono text in Deep Space black. Secondary buttons use a transparent background with the "glowing border" technique.
- **Technical Chips:** Used for skill tags (e.g., "Kubernetes", "AWS"). These should be monospaced, all-caps, with a subtle 1px border and no background fill unless hovered.
- **Interactive Terminal:** A signature component. A dark box with window controls (red/yellow/green dots), hosting monospaced text that auto-types on load.
- **Status Indicators:** Small pulsing dots used next to "Available for work" or "System Online" text, utilizing a CSS pulse animation.
- **Glass Cards:** Used for portfolio projects. They should feature a "glass" texture, a subtle border, and a background blur. On hover, the border-glow intensifies.
- **Inputs:** Dark, recessed backgrounds with cyan bottom-borders that expand to the full width of the input on focus.
