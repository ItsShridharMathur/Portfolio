import { motion } from "motion/react";

interface GlitchHeadingProps {
  title: string;
  subtitle?: string;
  color?: "cyan" | "green" | "purple";
  id?: string;
}

export default function GlitchHeading({
  title,
  subtitle,
  color = "cyan",
  id
}: GlitchHeadingProps) {
  const glowClass = 
    color === "green" 
      ? "text-glow-green text-hack-poison" 
      : color === "purple"
      ? "text-glow-purple text-accent-purple"
      : "text-glow-cyan text-ai-cyan";

  const barBgClass =
    color === "green"
      ? "bg-gradient-to-r from-hack-poison to-transparent"
      : color === "purple"
      ? "bg-gradient-to-r from-accent-purple to-transparent"
      : "bg-gradient-to-r from-ai-cyan to-transparent";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-2 select-none group relative"
    >
      <div className="flex items-center gap-3">
        {/* Glowing Lead Hack Line */}
        <div className={`h-[2px] w-8 ${barBgClass}`} />
        
        {/* Section Index Marker */}
        <span className="font-mono text-[10px] tracking-widest text-white/40">
          // SYS_MODULE_{title.toUpperCase().replace(/\s+/g, "_")}
        </span>
      </div>

      <div className="relative inline-block">
        {/* Main Heading Text with glitch hover state */}
        <h2 
          className={`font-display text-2xl md:text-4xl font-extrabold uppercase tracking-wider relative cursor-default transition-all duration-300 select-none group-hover:animate-glitch ${glowClass}`}
          data-text={title}
        >
          {title}
        </h2>
        
        {/* Duplicate layers for glitch visual separation */}
        <span className="absolute left-0 top-0 text-red-500 opacity-0 group-hover:opacity-75 -translate-x-[2px] translate-y-[1px] group-hover:animate-glitch font-display text-2xl md:text-4xl font-extrabold uppercase tracking-wider pointer-events-none select-none">
          {title}
        </span>
        <span className="absolute left-0 top-0 text-blue-500 opacity-0 group-hover:opacity-75 translate-x-[2px] -translate-y-[1px] group-hover:animate-glitch font-display text-2xl md:text-4xl font-extrabold uppercase tracking-wider pointer-events-none select-none">
          {title}
        </span>
      </div>

      {subtitle && (
        <p className="font-mono text-xs text-white/50 lowercase max-w-xl">
          &gt; {subtitle}
        </p>
      )}
    </motion.div>
  );
}
