import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Lock, ShieldAlert, Terminal as TermIcon, CalendarRange } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import MatrixRainCanvas from "./MatrixRainCanvas";

export default function EthicalHacking() {
  const terminalRef = useRef(null);
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  
  // Staged lines of fake terminal diagnostic outputs
  const logLines = [
    "initialising ethical_hacking_module...",
    "loading: network_security.py (OK)",
    "loading: penetration_testing.py (OK)",
    "loading: kali_linux_tools.py (OK)",
    "STATUS: COMING SOON...",
    "ETA: Post B.Tech 2026",
    "[SHRIDHAR.KR.MATHUR] — READY TO HACK THE FUTURE_"
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  // Trigger typewriter logic for terminal window line-by-line when in viewport
  useEffect(() => {
    if (!isTerminalInView) return;
    if (currentLineIdx >= logLines.length) return;

    const fullText = logLines[currentLineIdx];
    let charIdx = 0;

    const charTimer = setInterval(() => {
      if (charIdx < fullText.length) {
        setCurrentLineText(fullText.substring(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(charTimer);
        // Complete current line, append to visible array
        setVisibleLines((prev) => [...prev, fullText]);
        setCurrentLineText("");
        
        // Advance to next line with brief delay
        setTimeout(() => {
          setCurrentLineIdx((prev) => prev + 1);
        }, 350);
      }
    }, 25); // high-speed server output typing

    return () => clearInterval(charTimer);
  }, [isTerminalInView, currentLineIdx]);

  const lockBadges = ["Network Security", "Pen Testing", "OWASP 10", "Kali Linux", "CTF Labs"];

  return (
    <section id="hacking" className="relative py-24 select-none overflow-hidden bg-[#020205] border-b border-[#1a1a2e]">
      {/* Immersive Matrix Rain canvas backdrop overlaying Hacking space */}
      <div className="absolute inset-0 z-0">
        <MatrixRainCanvas />
      </div>

      {/* Futuristic top mask to dim the rain lines */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#020205] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020205] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Ethical Hacking" 
          subtitle="Building unbreakable systems by understanding offensive penetration mechanisms." 
          color="green"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 md:mt-16 text-left">
          
          {/* Left Column: Conceptual description */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-hack-poison/5 border border-hack-poison/15 text-[10px] tracking-widest text-hack-poison font-mono uppercase">
                <ShieldAlert size={12} className="animate-pulse" />
                SECURITY_FORECAST: ACADEMIC_HORIZON
              </div>

              <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-wider uppercase">
                The Next Chapter — Bridging AI &amp; Cybersecurity
              </h3>
              
              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-medium">
                After completing my B.Tech, I will be pursuing an Advanced Professional Certification in Ethical Hacking and Cybersecurity. My goal is to combine AI-powered intelligence with offensive and defensive security expertise — building systems that are not just smart, but unbreakable.
              </p>
            </motion.div>

            {/* Lock Badges list */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {lockBadges.map((badge, bidx) => (
                <motion.div
                  key={bidx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: bidx * 0.1 }}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest bg-hack-green/5 border border-hack-green/20 px-3 py-1 rounded-sm text-hack-poison"
                >
                  <Lock size={10} className="text-hack-poison/60" />
                  <span>{badge.toUpperCase()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Fake Interactive Hacker Terminal Console */}
          <div ref={terminalRef} className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full bg-[#05050a]/90 border border-[#1a1a2e] rounded-lg overflow-hidden neon-shadow-green font-mono text-[11px] select-none"
            >
              {/* Terminal header */}
              <div className="bg-black/80 px-4 py-2 flex items-center justify-between border-b border-[#1a1a2e]">
                <div className="flex items-center gap-2">
                  <TermIcon size={12} className="text-hack-poison" />
                  <span className="text-[10px] text-white/50 tracking-wider">SKM_HACK_LABS:~</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarRange size={11} className="text-white/30" />
                  <span className="text-[9px] text-white/30">SECURE_TERM: v1.0</span>
                </div>
              </div>

              {/* Console log outputs */}
              <div className="p-4 space-y-2 h-56 overflow-y-auto text-hack-poison/80 scrollbar-none">
                
                {/* Print historically typed lines */}
                {visibleLines.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="text-white/40 select-none">$</span>
                    <span className={line.includes("READY") ? "text-white font-bold" : line.includes("COMING") ? "text-yellow-400 font-bold animate-pulse" : ""}>
                      {line}
                    </span>
                  </div>
                ))}

                {/* Print active currently typing line */}
                {currentLineIdx < logLines.length && (
                  <div className="flex items-start gap-1">
                    <span className="text-white/40 select-none">$</span>
                    <span className="text-white">
                      {currentLineText}
                      <span className="animate-flicker bg-white ml-0.5 w-1.5 h-3 inline-block align-middle"></span>
                    </span>
                  </div>
                )}

                {/* End placeholder indicator */}
                {currentLineIdx >= logLines.length && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="pt-2 text-[9px] text-white/30"
                  >
                    -- SESSION LOCKED. WATCH THIS SPACE. --
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Big styled bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="font-display font-black text-xl sm:text-2xl text-white/20 tracking-widest uppercase">
            &quot;WATCH THIS SPACE.&quot;
          </div>
        </motion.div>

      </div>
    </section>
  );
}
