import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import { Experiences } from "../data";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative select-none overflow-hidden bg-[#020205]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-ai-blue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Work History" 
          subtitle="Professional engagements, internship deployments, and industry-oriented milestones." 
          color="cyan"
        />

        {/* Timeline Structure Container */}
        <div className="relative mt-16 md:mt-24 pl-6 md:pl-0">
          
          {/* Vertical central path line (placed on the left in mobile, center in desktop) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            {/* Animated glowing vertical filler */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-ai-cyan via-accent-purple to-hack-green"
            />
          </div>

          {/* Map through entries */}
          {Experiences.map((exp, idx) => {
            // Alternating layouts for desktop (left vs right cards)
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className="relative mb-16 md:mb-20 flex flex-col md:flex-row items-stretch">
                
                {/* Visual Connector Dot */}
                <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-cyber-bg border-2 border-ai-cyan -translate-x-1/2 z-20 flex items-center justify-center neon-shadow-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-ping" />
                </div>

                {/* Left Side (Desktop: Content or Empty space) */}
                <div className={`hidden md:flex md:w-1/2 pr-12 md:text-right flex-col ${isEven ? "md:items-end justify-center" : "md:hidden"}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-1.5 text-left md:text-right"
                    >
                      <div className="font-display font-black text-white text-lg tracking-wider">
                        {exp.company}
                      </div>
                      <div className="font-mono text-xs text-ai-cyan font-bold tracking-widest uppercase">
                        {exp.role}
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono justify-start md:justify-end">
                        <Calendar size={12} className="text-ai-cyan" />
                        <span>{exp.duration}</span>
                        <span className="text-white/20">|</span>
                        <MapPin size={12} className="text-ai-cyan" />
                        <span>{exp.location}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Gap columns block */}
                <div className="hidden md:block md:w-12" />

                {/* Right Side (Desktop: Content or Empty space) */}
                <div className={`w-full md:w-1/2 pl-0 md:pl-12 flex flex-col ${!isEven ? "md:items-start justify-center" : ""}`}>
                  
                  {/* For alternate cards, display metadata in the opposite empty column */}
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-1.5 mb-4 md:mb-0"
                    >
                      <div className="font-display font-black text-white text-lg tracking-wider">
                        {exp.company}
                      </div>
                      <div className="font-mono text-xs text-ai-cyan font-bold tracking-widest uppercase">
                        {exp.role}
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono justify-start">
                        <Calendar size={12} className="text-ai-cyan" />
                        <span>{exp.duration}</span>
                        <span className="text-white/20">|</span>
                        <MapPin size={12} className="text-ai-cyan" />
                        <span>{exp.location}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Main Work Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="w-full bg-[#05050a] border border-[#1a1a2e] p-6 rounded-xl relative overflow-hidden group hover:border-ai-cyan/20 transition-all duration-300 neon-shadow-cyan mt-4 md:mt-0"
                  >
                    {/* Subtle micro grid */}
                    <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

                    {/* Left edge coloring bar */}
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-ai-cyan to-ai-blue" />

                    {/* Metadata Header for mobile viewport only */}
                    <div className="block md:hidden space-y-1 mb-4">
                      <div className="font-display font-black text-white text-base tracking-wider">
                        {exp.company}
                      </div>
                      <div className="font-mono text-xs text-ai-cyan font-bold tracking-widest uppercase">
                        {exp.role}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-white/50 text-[10px] font-mono">
                        <Calendar size={11} className="text-ai-cyan" />
                        <span>{exp.duration}</span>
                        <span>|</span>
                        <MapPin size={11} className="text-ai-cyan" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Bullets List */}
                    <ul className="space-y-3 font-sans text-xs md:text-sm text-white/70 leading-relaxed font-medium">
                      {exp.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-2.5">
                          <span className="font-mono text-ai-cyan text-[10px] mt-1 shrink-0 select-none">&gt;&gt;</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Badges Container */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[#1a1a2e]">
                      {exp.badges.map((badge, bidx) => (
                        <span 
                          key={bidx} 
                          className="font-mono text-[9px] tracking-widest bg-ai-cyan/5 border border-ai-cyan/15 text-ai-cyan px-2.5 py-0.5 rounded-sm uppercase"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Decorative terminal info */}
                    <div className="absolute right-3 bottom-2 font-mono text-[8px] text-white/20">
                      SYS_SEC: AUTHENTICATED_INT
                    </div>
                  </motion.div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
