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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="fixed w-full z-[100] transition-all duration-300">
      {/* Navbar Bar */}
      <div
        className={cn(
          "py-3 md:py-5 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-md",
          !isScrolled && "md:bg-gradient-to-b md:from-background/70 md:via-background/40 md:to-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/icons/a6.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-primary">
              Anwar's <span className="text-glow">Portfolio</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 transition-colors",
                  activeSection === item.href ? "text-primary" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-background border-l border-border shadow-2xl translate-x-0">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <img src="/icons/a6.png" alt="Logo" className="h-10 w-10" />
                  <span className="font-semibold">Anwar's Portfolio</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-full"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 p-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-6 py-4 rounded-2xl text-lg font-medium transition-all",
                      activeSection === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground/80"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};