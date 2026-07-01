import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, ShieldAlert, Terminal, Sun, Moon } from "lucide-react";

// Importing modular components
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import EthicalHacking from "./components/EthicalHacking";
import EducationCertifications from "./components/EducationCertifications";
import Achievements from "./components/Achievements";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isBooted, setIsBooted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isKonamiActive, setIsKonamiActive] = useState(false);

  // Scroll tracking: calculate progress percentage & navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      setIsScrolled(scrollTop > 50);

      // Track active section based on scroll offsets
      const sections = ["hero", "about", "skills", "experience", "projects", "hacking", "education", "achievements", "contact"];
      const scrollPosition = scrollTop + 150; // offset for nav bar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Easter Egg: Konami Code Sequence Listener (up, up, down, down, left, right, left, right, b, a)
  useEffect(() => {
    const konamiSequence = [
      "arrowup",
      "arrowup",
      "arrowdown",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "arrowleft",
      "arrowright",
      "b",
      "a"
    ];
    let sequenceIdx = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key ? e.key.toLowerCase() : "";
      if (key === konamiSequence[sequenceIdx]) {
        sequenceIdx++;
        if (sequenceIdx === konamiSequence.length) {
          // Trigger matrix rain full-screen override
          setIsKonamiActive(true);
          sequenceIdx = 0;
          
          // Clear after 3 seconds
          setTimeout(() => {
            setIsKonamiActive(false);
          }, 3000);
        }
      } else {
        sequenceIdx = 0; // reset on wrong keypress
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper smooth-scroller to DOM ID selectors
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "hacking", label: "Hacking" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className={`relative min-h-screen text-white font-sans bg-[#020205] selection:bg-ai-cyan/30 selection:text-white antialiased overflow-x-hidden ${theme === "light" ? "light-mode-active" : "dark-mode"}`}>
      
      {/* 1. Page Booting Preloader */}
      <AnimatePresence>
        {!isBooted && (
          <Preloader onComplete={() => setIsBooted(true)} />
        )}
      </AnimatePresence>

      {/* Renders main app content once system is loaded */}
      {isBooted && (
        <>
          {/* Elegant Dark Subtle Radial Grid Background */}
          <div className="fixed inset-0 pointer-events-none opacity-30 elegant-dot-grid z-0" />

          {/* 2. Global Custom Interactive Cursor */}
          <CustomCursor />

          {/* 3. Thin Scroll Completion Progress Bar */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
            <div 
              className="h-full bg-gradient-to-r from-ai-cyan via-accent-purple to-hack-poison transition-all duration-75 text-glow-cyan shadow-[0_0_8px_#00f5ff]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* 4. Frosted Sticky Navigation Header */}
          <header 
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
              isScrolled 
                ? "bg-black/70 backdrop-blur-md border-b border-[#00f5ff]/20 py-4" 
                : "bg-transparent py-6"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              
              {/* Logo / Monogram SKM */}
              <button 
                onClick={() => scrollToSection("hero")}
                className="font-display font-black text-xl tracking-widest text-white hover:text-ai-cyan hover:scale-105 active:scale-95 transition-all cursor-pointer text-glow-cyan"
              >
                SKM<span className="text-ai-cyan font-bold">.</span>
              </button>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`transition-colors duration-300 cursor-pointer relative py-1 ${
                      activeSection === link.id 
                        ? "text-ai-cyan font-bold text-glow-cyan" 
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ai-cyan shadow-[0_0_5px_#00f5ff]"
                      />
                    )}
                  </button>
                ))}

                 {/* Theme Toggle Button */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-2.5 py-1.5 rounded-sm border border-cyber-border bg-cyber-card text-cyber-text hover:border-ai-cyan/50 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ai-cyan"></span>
                  </span>
                  {theme === "light" ? "GO_DARK" : "GO_LIGHT"}
                </button>

                {/* Secure Contact Button CTA */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-1.5 rounded-sm border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10 transition-all duration-300 active:scale-95 cursor-pointer neon-shadow-cyan"
                >
                  [SECURE_LINK]
                </button>
              </nav>

              {/* Mobile Controls & Hamburger */}
              <div className="flex items-center gap-4 md:hidden">
                {/* Theme Toggle Button (Mobile) */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-2 py-1 rounded border border-cyber-border bg-cyber-card text-[9px] font-mono tracking-wider text-cyber-text flex items-center gap-1.5 active:scale-[0.97] transition-all cursor-pointer"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ai-cyan"></span>
                  </span>
                  {theme === "light" ? "DARK" : "LIGHT"}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

            </div>

            {/* Mobile Nav Drawer overlay list */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-[#05050a] border-b border-[#1a1a2e] font-mono text-xs tracking-widest uppercase px-6 py-5 space-y-4"
                >
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`block w-full text-left py-2 border-b border-[#1a1a2e] transition-colors cursor-pointer ${
                        activeSection === link.id ? "text-ai-cyan text-glow-cyan" : "text-white/60"
                      }`}
                    >
                      &gt; {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full text-center py-2.5 rounded border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/5 transition-all duration-300"
                  >
                    [CONNECT_SECURE]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 5. Website Body Content Sections */}
          <main className="relative z-10 noise-overlay">
            
            {/* Hero Banner Landing */}
            <Hero 
              onWorkClick={() => scrollToSection("projects")} 
              onContactClick={() => scrollToSection("contact")} 
            />

            {/* About Profile Summary */}
            <About />

            {/* Modular Skill-set Competencies */}
            <Skills />

            {/* Professional Engagements Internship Timeline */}
            <ExperienceTimeline />

            {/* Practical Technical Project Showcase */}
            <Projects />

            {/* Hacking Labs Future Security Plan */}
            <EthicalHacking />

            {/* Education Degree & Clickable Flip Credentials */}
            <EducationCertifications />

            {/* Achievements & Bootcamps Grid */}
            <Achievements />

            {/* Glass-morphic Contact Portal with Rotating 3D sphere */}
            <ContactForm />

          </main>

          {/* 6. Footer section with system details */}
          <footer className="py-12 bg-[#05050a] border-t border-[#1a1a2e] text-center font-mono text-[11px] text-white/40 select-none">
            <div className="max-w-7xl mx-auto px-6 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-white/60">Shridhar Kr. Mathur</span>
                <span>|</span>
                <span>Lucknow Node 26.85N 80.94E</span>
              </div>
              
              <div className="text-white/30">
                Built with ☕ + React + Python + Passion
              </div>

              <div className="pt-2">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 border border-[#1a1a2e] hover:border-ai-cyan/30 hover:text-ai-cyan px-3.5 py-1.5 rounded transition-all duration-300 cursor-pointer"
                >
                  <ArrowUp size={11} />
                  <span>BACK_TO_TOP</span>
                </button>
              </div>

              <div className="text-[9px] text-white/20 pt-4">
                &copy; {new Date().getFullYear()} Shridhar Kr. Mathur. All systems authorized.
              </div>
            </div>
          </footer>
        </>
      )}

      {/* 7. Easter Egg Takeover full-screen Matrix overlay */}
      <AnimatePresence>
        {isKonamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black text-hack-poison font-mono select-none flex flex-col items-center justify-center p-6"
          >
            {/* Custom rain drops overlay */}
            <div className="absolute inset-0 opacity-40">
              <Preloader onComplete={() => {}} /> {/* falling diagnostic blocks */}
            </div>

            {/* Threat intelligence alert overlay */}
            <div className="relative z-10 bg-black/90 border-2 border-hack-poison p-8 rounded-lg max-w-lg w-full text-left space-y-4 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
              <div className="flex items-center gap-3 border-b border-hack-poison/30 pb-3 text-white">
                <ShieldAlert size={24} className="text-hack-poison animate-bounce" />
                <h4 className="font-display font-extrabold text-base tracking-widest">
                  KONAMI_CODE_UNLOCKED
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <p>&gt; DETECTING EXPLOIT SEQUENCE... SUCCESS.</p>
                <p className="text-white font-bold">&gt; SECURE SHELL INJECTED AT PORT 2026.</p>
                <p>&gt; bypassing access filters... 100%</p>
                <p className="text-hack-poison/60">&gt; signature: Shridhar Kr. Mathur</p>
                <p className="text-yellow-400 font-black pt-2 animate-pulse">
                  &gt; STATUS: COGNITIVE DECRYPT COMPLETE!
                </p>
              </div>

              <div className="flex items-center gap-2 text-[9px] text-white/40 pt-4 border-t border-hack-poison/20">
                <Terminal size={11} />
                <span>TERMINATING OVERTAKE SESSION IN 3.0S...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
