import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("LOCATING_CORE_LOGIC...");
  const [text, setText] = useState("");
  const targetText = "Initialising Shridhar.Portfolio()...";

  // Typing effect for the main title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < targetText.length) {
        setText(targetText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Simulating standard diagnostic lines and fast progress bar load
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600); // slight buffer for a premium feel
          return 100;
        }
        
        // Randomly change diagnostic messages based on loading milestones
        const next = prev + Math.floor(Math.random() * 8) + 2;
        const capped = Math.min(next, 100);
        
        if (capped < 25) {
          setStatus("CONNECTING_NEURAL_LAYERS...");
        } else if (capped < 50) {
          setStatus("LOAD_SYSTEM_LIBRARIES.SO...");
        } else if (capped < 75) {
          setStatus("INITIALISING_CYBER_MATRIX...");
        } else if (capped < 95) {
          setStatus("COMPILING_PREVIEW_REPRESENTATION...");
        } else {
          setStatus("SYSTEM_READY. [BOOTING_PORTFOLIO]");
        }
        
        return capped;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#0a0a0f] z-50 flex flex-col items-center justify-center font-mono text-xs px-6 select-none"
    >
      {/* Abstract neon background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-ai-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-hack-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="ml-1 tracking-wider">SKM_CORE_BOOT.SYS</span>
          </div>
          <div>v4.0.26</div>
        </div>

        {/* Typed Title */}
        <div className="text-sm font-semibold text-ai-cyan tracking-wider min-h-[24px] flex items-center">
          <span>{text}</span>
          <span className="animate-pulse bg-ai-cyan ml-1 w-2 h-4 inline-block"></span>
        </div>

        {/* Diagnostics Log Output */}
        <div className="bg-black/50 border border-white/5 rounded p-3 h-20 text-[10px] text-white/60 space-y-1 overflow-hidden font-mono">
          <div>$ shridhar-system --load-components</div>
          <div className="text-white/40">&gt;&gt; core.modules: loaded</div>
          <div className="text-white/40">&gt;&gt; assets.cached: 100%</div>
          <div className="text-hack-green font-semibold">&gt;&gt; {status}</div>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-white/50">
            <span>UPTIME: 2026.06.29_12:11</span>
            <span className="font-semibold text-ai-cyan">{progress}%</span>
          </div>
          <div className="h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-ai-cyan via-accent-purple to-hack-green"
            />
          </div>
        </div>
        
        {/* Decorative Loading Spinner */}
        <div className="flex justify-center pt-2">
          <div className="w-4 h-4 border-2 border-ai-cyan/20 border-t-ai-cyan rounded-full animate-spin"></div>
        </div>
      </div>
    </motion.div>
  );
}
