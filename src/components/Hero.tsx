import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import TypedText from "./TypedText";
import { ShridharInfo } from "../data";

interface HeroProps {
  onWorkClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onWorkClick, onContactClick }: HeroProps) {
  const socialIcons = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/shridharkumarmathur/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/ItsShridharMathur", label: "GitHub" },
    { icon: Mail, href: `mailto:${ShridharInfo.email}`, label: "Email" },
    { icon: Phone, href: `tel:${ShridharInfo.phone.replace(/\s+/g, "")}`, label: "Phone" }
  ];

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020205]">
      {/* 3D Neural Network Background */}
      <NeuralNetworkCanvas />


      {/* Floating Left Side Social Links (Hidden on small mobile, visible on desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-6 z-40"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-ai-cyan/40 self-center"></div>
        {socialIcons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-white/40 hover:text-ai-cyan transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
            >
              <Icon size={18} />
            </a>
          );
        })}
        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-ai-cyan/40 self-center"></div>
      </motion.div>

      {/* Outer Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl space-y-8 select-none">
        
        {/* Module Header Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-cyan/5 border border-ai-cyan/15 text-[10px] tracking-widest text-ai-cyan uppercase font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-pulse"></span>
          SYS_ONLINE: NODE_SHRIDHAR_ACTIVE
        </motion.div>

        {/* Glitch Main Name Heading */}
        <div className="relative group inline-block">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-wider text-white select-none relative uppercase group-hover:animate-glitch cursor-default"
            data-text={ShridharInfo.name}
          >
            {ShridharInfo.name}
          </motion.h1>
          {/* Visual Glitch Duplicates */}
          <span className="absolute left-0 top-0 text-ai-cyan opacity-0 group-hover:opacity-60 -translate-x-[2px] translate-y-[1px] font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase pointer-events-none select-none">
            {ShridharInfo.name}
          </span>
          <span className="absolute left-0 top-0 text-accent-purple opacity-0 group-hover:opacity-60 translate-x-[2px] -translate-y-[1px] font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase pointer-events-none select-none">
            {ShridharInfo.name}
          </span>
        </div>

        {/* Subtitle typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-2xl font-mono text-white/70 min-h-[40px] flex items-center justify-center gap-2"
        >
          <span>&gt;_ DEVELOPING_</span>
          <TypedText
            words={[
              "AI Engineer",
              "Python Developer",
              "ML Researcher",
              "Ethical Hacking Enthusiast",
              "Problem Solver"
            ]}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base text-white/50 max-w-xl mx-auto font-sans leading-relaxed tracking-wide font-medium"
        >
          &quot;{ShridharInfo.tagline}&quot;
        </motion.p>


      </div>

      {/* Pulsing bounce Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-ai-cyan transition-colors cursor-pointer flex flex-col items-center gap-2"
        onClick={onWorkClick}
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">SCROLL_DOWN</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
