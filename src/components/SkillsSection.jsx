import { Terminal, Code2, Server, Database, Wrench, Braces } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    color: "text-blue-400",
    iconBg: "bg-blue-500/10",
    glow: "bg-blue-500/20",
    title: "Frontend Development",
    description: "Interactive UI & SPAs",
    skills: [
      { name: "React", dot: "bg-sky-400" },
      { name: "Redux", dot: "bg-purple-500" },
      { name: "Tailwind CSS", dot: "bg-cyan-400" },
      { name: "Framer Motion", dot: "bg-pink-500" },
      { name: "Shadcn UI", dot: "bg-slate-400" },
    ],
  },
  {
    icon: Server,
    color: "text-orange-400",
    iconBg: "bg-orange-500/10",
    glow: "bg-orange-500/20",
    title: "Backend Development",
    description: "APIs & Server Architecture",
    skills: [
      { name: "Express.js", dot: "bg-red-500" },
      { name: "Node.js", dot: "bg-emerald-500" },
      { name: "REST API", dot: "bg-sky-400" },
      { name: "Mongoose", dot: "bg-red-500" },
      { name: "Firebase", dot: "bg-purple-500" },
      { name: "Supabase", dot: "bg-slate-300" },
    ],
  },
  {
    icon: Braces,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    glow: "bg-emerald-500/20",
    title: "Languages",
    description: "Core Logic & Scripting",
    skills: [
      { name: "JavaScript", dot: "bg-sky-400" },
      { name: "C++", dot: "bg-slate-400" },
    ],
  },
  {
    icon: Database,
    color: "text-purple-400",
    iconBg: "bg-purple-500/10",
    glow: "bg-purple-500/20",
    title: "Databases",
    description: "Data Architecture",
    skills: [
      { name: "MongoDB", dot: "bg-emerald-400" },
      { name: "MySQL", dot: "bg-sky-400" },
      { name: "SQL Server", dot: "bg-red-500" },
    ],
  },
  {
    icon: Wrench,
    color: "text-rose-400",
    iconBg: "bg-rose-500/10",
    glow: "bg-rose-500/20",
    title: "Tools & Platforms",
    description: "DevOps & Cloud",
    skills: [
      { name: "AWS", dot: "bg-yellow-500" },
      { name: "Git", dot: "bg-orange-500" },
      { name: "GitHub", dot: "bg-slate-300" },
      { name: "VS Code", dot: "bg-sky-400" },
      { name: "Vercel", dot: "bg-slate-300" },
      { name: "Render", dot: "bg-emerald-400" },
      { name: "Postman", dot: "bg-orange-500" },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4 mb-12 md:mb-16">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            Skills <span className="text-primary">&amp;</span> Expertise
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map(
            ({ icon: Icon, color, iconBg, glow, title, description, skills }) => (
              <div
                key={title}
                className="group relative bg-card/80 border border-border/60 rounded-3xl p-6 md:p-8 
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10
                           hover:border-primary/30"
              >
                {/* Glow Accent */}
                <div
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-0 
                             group-hover:opacity-30 transition-opacity duration-500 ${glow}`}
                />

                <div className="relative">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`p-4 rounded-2xl flex-shrink-0 transition-transform duration-300 
                                 group-hover:scale-110 group-hover:-rotate-6 ${iconBg}`}
                    >
                      <Icon className={`h-7 w-7 ${color}`} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold leading-tight pt-1">
                      {title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-6 text-[15px] md:text-base">
                    {description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-2 bg-muted/80 hover:bg-muted border border-border/50 
                                   rounded-xl px-4 py-2 text-sm font-medium text-foreground 
                                   transition-all active:scale-95"
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${skill.dot}`} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};