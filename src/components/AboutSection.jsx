import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Passionate Web Developer</h3>

            <p className="text-muted-foreground">
              I’m a Full-Stack Web Developer who builds clean, practical
              applications that work. My main tools are MongoDB, Express.js,
              React & Node.js. I write code that is easy to maintain, design
              databases that run fast, and build frontends that look good on any
              screen.
            </p>

            <p className="text-muted-foreground">
              I build projects from scratch handling everything from setting up
              the server and database architecture to crafting the final user
              interface. For me, a good application is one that is fast, secure,
              and easy for people to use.
            </p>
            <p className="text-muted-foreground">
              I enjoy working with teams, solving tricky coding problems, and
              picking up new technologies as I go. If you have an idea for a web
              platform or mobile app, let’s connect and build it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="/resume/anwarbasharesume.pdf"
                download="anwarbasharesume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <img
                    src="/icons/icon-dev.svg"
                    alt="Development"
                    className="h-16 w-16 text-primary"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {" "}
                    Full-Stack Web Development
                  </h4>
                  <p className="text-muted-foreground">
                    High-quality development of web applications at a
                    professional level.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <img
                    src="/icons/icon-design.svg"
                    alt="Development"
                    className="h-16 w-16 text-primary"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">
                    Crafting seamless user experiences through intuitive visual
                    design.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <img
                    src="/icons/icon-dev.svg"
                    alt="Development"
                    className="h-16 w-16 text-primary"
                  />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    API & Cloud Solutions
                  </h4>
                  <p className="text-muted-foreground">
                    Integrating robust APIs and secure cloud deployment
                    solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
