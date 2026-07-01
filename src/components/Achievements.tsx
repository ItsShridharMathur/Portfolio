import { motion } from "motion/react";
import { Trophy, Cpu, Code, ShieldCheck } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import { AchievementsList } from "../data";

export default function Achievements() {
  // Helper to map string identifiers to physical Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Trophy": return <Trophy className="text-glow-cyan text-ai-cyan" size={24} />;
      case "Cpu": return <Cpu className="text-glow-purple text-accent-purple" size={24} />;
      case "Code": return <Code className="text-glow-green text-hack-poison" size={24} />;
      default: return <ShieldCheck className="text-ai-cyan" size={24} />;
    }
  };

  return (
    <section id="achievements" className="py-24 relative select-none overflow-hidden bg-[#020205] border-y border-[#1a1a2e]">
      {/* Dynamic background ambient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-y-1/2 w-96 h-96 bg-hack-poison/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Achievements" 
          subtitle="Extra-curricular leadership, industry workshops, and core development bootcamps." 
          color="cyan"
        />

        {/* Grid layout of glowing milestone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
          {AchievementsList.map((ach, idx) => {
            // Distinct visual offsets and glow parameters per card
            const glowClass = 
              idx === 0 
                ? "hover:border-ai-cyan/30 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]" 
                : idx === 1 
                ? "hover:border-accent-purple/30 hover:shadow-[0_0_15px_rgba(139,0,255,0.15)] purple-hover" 
                : "hover:border-hack-poison/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]";

            const borderHighlight =
              idx === 0
                ? "bg-ai-cyan"
                : idx === 1
                ? "bg-accent-purple"
                : "bg-hack-poison";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative p-6 rounded-xl bg-[#05050a] border border-[#1a1a2e] overflow-hidden transition-all duration-300 ${glowClass}`}
              >
                {/* Accent coloring edge tag */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 ${borderHighlight}`} />
                
                {/* Tech microgrid background */}
                <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

                <div className="space-y-4 text-left">
                  {/* Top Header Row with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded bg-[#05050a] border border-[#1a1a2e] shrink-0">
                      {getIcon(ach.icon)}
                    </div>
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                      SYS_RECORD_{idx + 1}
                    </span>
                  </div>

                  {/* Title and Event Meta */}
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-white tracking-wider uppercase">
                      {ach.title}
                    </h4>
                    <p className="font-mono text-[10px] text-white/50 tracking-wide uppercase">
                      // {ach.event}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="font-sans text-xs md:text-sm text-white/60 leading-relaxed font-medium">
                    {ach.description}
                  </p>
                </div>

                {/* Cyber index footer */}
                <div className="absolute right-3 bottom-1.5 font-mono text-[7px] text-white/10">
                  COM_STATUS: SIGNED_VERIFIED
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
