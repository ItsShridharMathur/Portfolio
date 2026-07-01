import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import GlitchHeading from "./GlitchHeading";
import { ShridharInfo } from "../data";
import profileImage from "../assets/images/regenerated_image_1782846203160.png";

// Automated counting up stat indicator
function StatCounter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalFrames = Math.floor(duration / 16);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.floor(end * (progress * (2 - progress)));
      
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-display font-black text-3xl md:text-5xl text-glow-cyan text-ai-cyan">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-45, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.3, 1.0]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.85], [0.15, 1]);
  const filterImage = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(8px) grayscale(70%) brightness(0.6)", "blur(0px) grayscale(0%) brightness(1)"]
  );

  return (
    <section id="about" ref={containerRef} className="py-24 relative select-none overflow-hidden bg-[#020205]">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="About Me" 
          subtitle="System diagnostics, bio summaries, and structural metrics." 
          color="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 md:mt-16">
          
          {/* Left Column: 3D-feeling Hexagonal Frame SKM monogram */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            >
              {/* Outer rotating decorative hexagon frames */}
              <div className="absolute inset-0 clip-hexagon bg-gradient-to-tr from-ai-cyan via-transparent to-accent-purple animate-spin-slow opacity-30"></div>
              
              <div 
                className="absolute inset-2 clip-hexagon bg-gradient-to-bl from-accent-purple via-transparent to-ai-cyan animate-spin-reverse opacity-20"
                style={{ animationDuration: "12s" }}
              ></div>

              {/* Glowing static backdrop hexagon */}
              <div className="absolute inset-4 clip-hexagon bg-[#05050a] border border-[#1a1a2e] flex items-center justify-center neon-shadow-cyan group hover:border-ai-cyan transition-all duration-500 overflow-hidden">
                
                {/* Tech scan lines inside */}
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none z-20" />

                {/* The scrolling profile image */}
                <motion.div
                  style={{ y: yImage, scale: scaleImage, opacity: opacityImage, filter: filterImage }}
                  className="absolute inset-0 w-full h-full clip-hexagon overflow-hidden"
                >
                  <img
                    src={profileImage}
                    alt="Shridhar Kr. Mathur"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover mix-blend-luminosity brightness-[0.75] contrast-[1.15] transition-all duration-500 group-hover:mix-blend-normal group-hover:scale-105 group-hover:brightness-[0.95]"
                  />
                </motion.div>

                {/* Initial Monogram "SKM" overlay */}
                <div className="absolute bottom-4 left-0 right-0 text-center space-y-0.5 z-20 bg-black/60 backdrop-blur-sm py-1.5 border-y border-[#1a1a2e]/50">
                  <div className="font-display font-black text-lg md:text-xl tracking-widest text-white group-hover:text-ai-cyan transition-colors duration-300 text-shadow-glow">
                    SKM
                  </div>
                  <div className="font-mono text-[8px] tracking-widest text-white/40 uppercase">
                    NODE_IDENTIFIED
                  </div>
                </div>

                {/* Holographic matrix-like circles */}
                <div className="absolute w-44 h-44 border border-dashed border-ai-cyan/15 rounded-full animate-spin pointer-events-none z-10" style={{ animationDuration: "25s" }} />
                <div className="absolute w-36 h-36 border border-dashed border-accent-purple/10 rounded-full animate-spin-reverse pointer-events-none z-10" style={{ animationDuration: "18s" }} />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Narrative & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-display text-lg font-bold tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ai-cyan"></span>
                CORE_OBJECTIVE.EXE
              </h3>
              
              {/* Typewriter-reveal effect on paragraphs */}
              <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed tracking-wide font-medium">
                {ShridharInfo.bio}
              </p>
            </motion.div>

            {/* Stat Counters Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1a1a2e]">
              
              {/* Stat 2 */}
              <div className="bg-[#05050a] border border-[#1a1a2e] rounded-lg p-4 space-y-1 relative overflow-hidden group hover:bg-white/5 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple" />
                <div className="flex flex-col">
                  <StatCounter target={20} suffix="+" />
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    Object Classes
                  </span>
                </div>
                <p className="text-[10px] text-white/50 pt-2 font-mono">
                  &gt; YOLO vision index
                </p>
              </div>

              {/* Stat 3 */}
              <div className="bg-[#05050a] border border-[#1a1a2e] rounded-lg p-4 space-y-1 relative overflow-hidden group hover:bg-white/5 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-hack-poison" />
                <div className="flex flex-col">
                  <StatCounter target={15} suffix="+" />
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    Automations Built
                  </span>
                </div>
                <p className="text-[10px] text-white/50 pt-2 font-mono">
                  &gt; voice / file scripts
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
