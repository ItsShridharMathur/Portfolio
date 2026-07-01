import { motion } from "motion/react";
import { GraduationCap, Award, ExternalLink, Calendar, MapPin, Sparkles } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import { EducationInfo, CertificationsList } from "../data";
import { Certification } from "../types";

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="w-full h-32 relative perspective-1000 group select-none">
      {/* Flipping card container */}
      <div className="w-full h-full relative transition-transform duration-500 preserve-3d group-hover:rotate-y-180 cursor-pointer">
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-[#05050a] border border-[#1a1a2e] p-4 flex flex-col justify-between hover:border-accent-purple/30 transition-colors duration-300 neon-shadow-purple">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-sm bg-accent-purple/10 text-accent-purple">
              <Award size={16} />
            </div>
            <div className="space-y-1 text-left">
              <span className="font-display font-black text-[10px] tracking-widest text-accent-purple uppercase block">
                CERTIFICATE_ISSUED
              </span>
              <h4 className="font-display font-bold text-xs md:text-sm text-white leading-tight tracking-wide line-clamp-2">
                {cert.title}
              </h4>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-[8px] font-mono text-white/30">
            <span>SYS_CERT: VERIFIED_HASH</span>
            <span className="animate-pulse text-accent-purple/60">&lt; CLICK_FLIP &gt;</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-accent-purple/15 border border-accent-purple/30 p-4 flex flex-col justify-between text-left">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-accent-purple font-bold tracking-widest block">
              // ISSUER_AUTHORITY:
            </span>
            <div className="font-display font-bold text-sm text-white">
              {cert.issuer}
            </div>
            <div className="font-mono text-[9px] text-white/50 lowercase">
              program: {cert.program}
            </div>
          </div>
          
          {/* Real click redirection anchor */}
          <a
            href={cert.url}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="self-end flex items-center gap-1.5 font-mono text-[10px] text-accent-purple border border-accent-purple/30 px-3 py-1 rounded bg-black/40 hover:bg-accent-purple hover:text-white hover:border-accent-purple transition-all duration-300"
          >
            <span>[View Cert]</span>
            <ExternalLink size={10} />
          </a>
        </div>

      </div>
    </div>
  );
}

export default function EducationCertifications() {
  return (
    <section id="education" className="py-24 relative select-none overflow-hidden bg-[#020205]">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Education &amp; Credentials" 
          subtitle="Academic curriculum degrees, corporate bootcamp credentials, and verified certifications." 
          color="purple"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 md:mt-16 items-start">
          
          {/* Left Column: Education details (glowing degree card) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1a1a2e] pb-3">
              <span className="w-1.5 h-3 bg-accent-purple rounded-full animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Academic Pathway
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-6 rounded-xl bg-[#05050a] border border-[#1a1a2e] neon-shadow-purple overflow-hidden"
            >
              {/* Decorative graphic nodes */}
              <div className="absolute top-0 right-0 p-3 bg-accent-purple/10 text-accent-purple rounded-bl-xl border-l border-b border-[#1a1a2e]">
                <GraduationCap size={24} className="animate-pulse" />
              </div>

              {/* Dynamic light scanline overlay */}
              <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

              <div className="space-y-6 text-left">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] tracking-widest text-accent-purple font-black uppercase">
                    // UNDERGRADUATE_DEGREE
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-white tracking-wider uppercase">
                    {EducationInfo.institution}
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Degree Name */}
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="text-accent-purple shrink-0 mt-1" size={14} />
                    <div className="font-sans text-sm md:text-base text-white/80 font-semibold leading-relaxed">
                      {EducationInfo.degree}
                    </div>
                  </div>

                  {/* Details row */}
                  <div className="flex flex-wrap items-center gap-4 text-white/50 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent-purple" />
                      <span>{EducationInfo.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent-purple" />
                      <span>{EducationInfo.location}</span>
                    </div>
                  </div>

                  {/* CGPA Display */}
                  <div className="inline-flex items-center gap-3 bg-accent-purple/5 border border-accent-purple/20 rounded px-4 py-2 mt-2">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                      Cumulative Score:
                    </span>
                    <span className="font-display font-black text-lg text-glow-purple text-accent-purple">
                      CGPA {EducationInfo.cgpa}
                    </span>
                  </div>
                </div>

                {/* Micro terminal summary footer */}
                <div className="border-t border-[#1a1a2e] pt-4 text-[10px] text-white/40 font-mono leading-relaxed">
                  Academic focus: Machine learning pipelines, deep network topologies, neural intent classification, relational algebra, and computer vision systems.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clickable Certifications (glowing grid) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1a1a2e] pb-3">
              <span className="w-1.5 h-3 bg-accent-purple rounded-full animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Professional Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CertificationsList.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <CertCard cert={cert} />
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
