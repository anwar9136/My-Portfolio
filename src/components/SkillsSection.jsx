import { Code2, Smartphone, Server, Database, Wrench, Terminal, Braces, } from "lucide-react";

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
      // { name: "TypeScript", dot: "bg-blue-500" },
      { name: "Redux", dot: "bg-purple-500" },
      { name: "Tailwind CSS", dot: "bg-cyan-400" },
      { name: "Framer Motion", dot: "bg-pink-500" },
      { name: "Shadcn UI", dot: "bg-slate-400" },
      // { name: "GSAP", dot: "bg-green-500" },
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
      { name: "Supabase ", dot: "bg-slate-300" },
    ],
  },

  {
    icon: Braces,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    glow: "bg-emerald-500/20",
    title: "Languages",
    description: "Core Logic & Scripting Languages",
    skills: [
      { name: "Javascript", dot: "bg-sky-400" },
      { name: "C++", dot: "bg-slate-400" },
      // { name: "Android (Java/Kotlin)", dot: "bg-emerald-400" },
      // { name: "Android Studio", dot: "bg-sky-400" },
      // { name: "iOS", dot: "bg-slate-300" },
    ],
  },
  
  {
    icon: Database,
    color: "text-purple-400",
    iconBg: "bg-purple-500/10",
    glow: "bg-purple-500/20",
    title: "Databases",
    description: "Data Architecture & Management",
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
    description: "DevOps & Cloud Workflows",
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
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Skills <span className="text-primary">&amp;</span> Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ icon: Icon, color, iconBg, glow, title, description, skills }) => (
            <div
              key={title}
              className="group relative bg-card/70 border border-border/50 rounded-2xl p-7 overflow-hidden
                         transition-all duration-300 ease-out
                         hover:border-border hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              {/* corner glow accent */}
              <div
                className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-0
                            group-hover:opacity-100 transition-opacity duration-500 ${glow}`}
              />

              <div className="relative">
                <div className="flex items-start gap-3 mb-2">
                  {/* CHANGED: icon box now scales up + tilts when the parent card (`group`) is hovered */}
                  <div
                    className={`p-3 rounded-xl flex-shrink-0 transition-transform duration-300 ease-out
                               group-hover:scale-125 group-hover:-rotate-6 ${iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="text-2xl font-bold leading-tight pt-1">
                    {title}
                  </h3>
                </div>

                <p className="text-base text-muted-foreground mb-6 text-gray-400">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 bg-gray-500/15 border border-border/40 rounded-lg px-4 py-2
                                 text-[15px] font-semibold text-foreground
                                 transition-all duration-200
                                 hover:bg-gray-500/25 hover:border-primary/40"
                    >
                      <span className={`h-[7px] w-[7px] rounded-full flex-shrink-0 ${skill.dot}`} />
                      <span className="whitespace-nowrap">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};