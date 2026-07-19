import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/90 backdrop-blur-md shadow-md shadow-black/5 border-b border-border/50"
          : "py-5 bg-gradient-to-b from-background/60 via-background/30 to-transparent backdrop-blur-sm"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center gap-1 transition-opacity hover:opacity-80" // CHANGED: added gap-2 for spacing next to the new logo image
          href="#hero"
        >
          {/* ADDED: astronaut-on-moon logo, save it in your /public folder (e.g. /public/logo.png) */}
          <img
            src="/icons/a6.png"
            alt="Anwar's Portfolio logo"
            className="h-14 w-14 object-contain flex-shrink-0"
          />
          <span className="relative z-10">
            <span className="text-glow text-foreground"> Anwar's </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className={cn(
                "relative group text-foreground/90 hover:text-primary transition-colors duration-300",
                activeSection === item.href && "text-primary"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                  activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </a>
          ))}
        </div>

        {/* mobile nav toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-colors duration-300",
                  activeSection === item.href && "text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};