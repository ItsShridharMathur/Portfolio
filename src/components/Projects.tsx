import { motion } from "motion/react";
import { FolderGit, Github, ExternalLink, Cpu } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import TiltCard from "./TiltCard";
import { ProjectsList } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative select-none overflow-hidden bg-[#020205] border-b border-[#1a1a2e]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ai-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Featured Projects" 
          subtitle="Engineered systems, intelligent models, and custom automation controllers built from the ground up." 
          color="cyan"
        />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-16">
          {ProjectsList.map((project, idx) => {
            const accent = project.accentColor; // "cyan" or "purple"
            
            // Render conditional colors based on metadata
            const glowClass = accent === "purple" ? "text-glow-purple text-accent-purple" : "text-glow-cyan text-ai-cyan";
            const borderGlow = accent === "purple" ? "purple-hover border-accent-purple/30" : "border-ai-cyan/30";
            const btnGlow = accent === "purple" ? "hover:bg-accent-purple/10 border-accent-purple/40 text-accent-purple" : "hover:bg-ai-cyan/10 border-ai-cyan/40 text-ai-cyan";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={accent === "purple" ? "purple-hover" : ""}
              >
                <TiltCard accentColor={accent} className="h-full flex flex-col justify-between">
                  {/* Card Main Body */}
                  <div className="p-5 space-y-5">
                    
                    {/* macOS Terminal-style top bar */}
                    <div className="flex items-center justify-between border-b border-[#1a1a2e] pb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                        <span className="ml-2 font-mono text-[10px] text-white/30 tracking-wider">
                          skm_module://{(project.title || "").toLowerCase().replace(/\s+/g, "_")}.py
                        </span>
                      </div>
                      
                      {/* Pulse beacon if active */}
                      {project.isLive && (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
                          </span>
                          <span className="font-mono text-[9px] text-accent-purple font-black tracking-widest uppercase">
                            LIVE_ONGOING
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wider uppercase group-hover:text-ai-cyan transition-colors">
                          {project.title}
                        </h4>
                        <Cpu className={`shrink-0 ${glowClass}`} size={16} />
                      </div>

                      {/* Timeline Duration */}
                      <div className="font-mono text-[10px] text-white/40 tracking-wider">
                        // COMMITTED: {project.duration}
                      </div>

                      {/* Main Paragraph Description */}
                      <p className="font-sans text-xs md:text-sm text-white/60 leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.stack.map((item, sidx) => (
                        <span 
                          key={sidx}
                          className="font-mono text-[9px] text-white/50 bg-[#05050a] border border-[#1a1a2e] px-2 py-0.5 rounded-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 border-t border-[#1a1a2e] bg-black/20 flex flex-wrap gap-3 items-center justify-between">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).map((tag, tidx) => (
                        <span 
                          key={tidx}
                          className={`font-mono text-[9px] tracking-wider uppercase font-bold ${
                            accent === "purple" ? "text-accent-purple" : "text-ai-cyan"
                          }`}
                        >
                          #{(tag || "").toLowerCase().replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>

                    {/* Button link */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 border px-4 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 ${btnGlow}`}
                    >
                      <Github size={12} />
                      <span>[View Code]</span>
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
