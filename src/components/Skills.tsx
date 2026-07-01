import { motion } from "motion/react";
import GlitchHeading from "./GlitchHeading";
import { AISkills, HackingSkills } from "../data";
import { Skill, HackingSkill } from "../types";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="w-full h-36 relative perspective-1000 group">
      {/* Flipping shell container */}
      <div className="w-full h-full relative transition-transform duration-500 preserve-3d group-hover:rotate-y-180 cursor-pointer">
        
        {/* FRONT FACE OF FLIP CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-[#05050a] border border-[#1a1a2e] p-4 flex flex-col justify-between hover:border-ai-cyan/40 transition-colors duration-300 neon-shadow-cyan">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-sm tracking-wider text-white">
                {skill.name}
              </span>
              <span className="font-mono text-xs text-ai-cyan font-semibold">
                {skill.percentage}%
              </span>
            </div>
            
            {/* Custom glowing micro progress bar */}
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-ai-cyan to-ai-blue" 
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
            <span>SYS_INDEX: ML_{skill.name.toUpperCase().slice(0, 3)}</span>
            <span className="animate-pulse text-ai-cyan/50">&lt; HOVER_INFO &gt;</span>
          </div>
        </div>

        {/* BACK FACE OF FLIP CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-ai-blue/10 border border-ai-cyan/30 p-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-ai-cyan font-bold tracking-widest block">
              // FIELD_METADATA:
            </span>
            <p className="font-sans text-[11px] text-white/80 leading-relaxed font-medium">
              {skill.description}
            </p>
          </div>
          <span className="font-mono text-[9px] text-white/30 text-right">
            SECURE_COMPILED
          </span>
        </div>

      </div>
    </div>
  );
}

function HackingSkillCard({ skill }: { skill: HackingSkill }) {
  // Select color based on progress status
  const statusColor = 
    skill.status === "Acquired" 
      ? "text-hack-poison" 
      : skill.status === "In Progress"
      ? "text-yellow-400"
      : "text-white/40";

  return (
    <div className="w-full h-36 relative perspective-1000 group">
      {/* Flipping shell container */}
      <div className="w-full h-full relative transition-transform duration-500 preserve-3d group-hover:rotate-y-180 cursor-pointer">
        
        {/* FRONT FACE OF FLIP CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-[#05050a] border border-[#1a1a2e] p-4 flex flex-col justify-between hover:border-hack-poison/40 transition-colors duration-300 neon-shadow-green">
          <div className="space-y-1.5">
            <div className="flex justify-between items-start">
              <span className="font-display font-bold text-sm tracking-wider text-white">
                {skill.name}
              </span>
              <span className={`font-mono text-[9px] tracking-widest uppercase border border-white/10 px-1.5 py-0.5 rounded-sm ${statusColor}`}>
                {skill.status}
              </span>
            </div>
            
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-hack-green to-hack-poison" 
                style={{ width: skill.status === "Acquired" ? "100%" : skill.status === "In Progress" ? "50%" : "5%" }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
            <span>SEC_PORT: P_SHIELD_{skill.name.toUpperCase().slice(0, 3)}</span>
            <span className="animate-pulse text-hack-poison/50">&lt; EXPLORE &gt;</span>
          </div>
        </div>

        {/* BACK FACE OF FLIP CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-[#0e1f14] border border-hack-poison/30 p-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-hack-poison font-bold tracking-widest block">
              // OFFENSIVE_RESOURCES:
            </span>
            <p className="font-sans text-[11px] text-white/85 leading-relaxed font-medium">
              {skill.description}
            </p>
          </div>
          <span className="font-mono text-[9px] text-white/30 text-right">
            TARGET_ACQUISITION
          </span>
        </div>

      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative select-none overflow-hidden bg-[#020205] border-y border-[#1a1a2e]">
      {/* Background neon flares */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-ai-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-hack-poison/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Skills Portfolio" 
          subtitle="Dual-discipline system capabilities spanning artificial intelligence development and network security structures." 
          color="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 md:mt-16">
          
          {/* Left Side: AI / ML & General Development */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1a1a2e] pb-3">
              <span className="w-1.5 h-3 bg-ai-cyan rounded-full animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Intelligence Engine &amp; General Dev
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {AISkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Ethical Hacking & Cybersecurity (Coming Soon) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1a1a2e] pb-3">
              <span className="w-1.5 h-3 bg-hack-poison rounded-full animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Defensive Labs &amp; Hacking [Pending]
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HackingSkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <HackingSkillCard skill={skill} />
                </motion.div>
              ))}
            </div>

            {/* Explanatory Cyber Overlay Terminal */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-black/50 border border-[#1a1a2e] rounded-lg p-4 font-mono text-[11px] text-white/50 space-y-2"
            >
              <div className="text-hack-poison font-semibold">// SECURITY_MISSION_DIRECTIVE:</div>
              <p className="leading-relaxed">
                Offensive training path designed for ethical testing of distributed AI workloads. Developing defensive safeguards protecting pipelines from prompt injection, parameter hijacking, and deep-layer model inversion attacks.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
