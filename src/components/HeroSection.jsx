import { ArrowDown } from "lucide-react";

// ADDED: quick tech-stack row — gives recruiters an instant scan of your
// core stack without them having to read the paragraph
const techStack = ["MongoDB", "Express", "React", "Node.js"];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* ADDED: soft background glow blobs — gives the section depth instead
          of a flat solid background, without competing with the text */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Anwar
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Basha
            </span>
          </h1>

          {/* FIXED: "max-2-2xl" isn't a valid Tailwind class — it was silently
              doing nothing, so the paragraph had no width constraint at all.
              Corrected to "max-w-2xl". */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Full Stack MERN Developer turning ideas into scalable, production-ready web applications using MongoDB, Express, React & Node.js.
          </p>

          {/* ADDED: tech stack pills — reinforces the paragraph visually,
              scannable in under a second */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 opacity-0 animate-fade-in-delay-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-secondary/60 border border-border/40 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CHANGED: added a secondary outlined CTA next to the existing
              button — matches the primary/secondary button pattern already
              used in your About section, and gives recruiters a lower-friction
              action than jumping straight to Projects */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-primary/40 text-foreground font-medium
                         transition-all duration-300 hover:bg-primary/10 hover:border-primary"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};