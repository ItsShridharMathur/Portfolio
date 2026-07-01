import { useEffect, useRef, useState } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [hoverType, setHoverType] = useState<"none" | "cyan" | "green" | "purple">("none");

  // Mouse coordinate refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation values for smooth outer ring lag
  const ringPos = useRef({ x: 0, y: 0 });
  const sparks = useRef<Spark[]>([]);

  useEffect(() => {
    // Check if device is touch or mobile
    const checkDevice = () => {
      const mobile = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768 ||
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      if (!mobile) setIsVisible(true);
      return mobile;
    };

    const mobile = checkDevice();
    window.addEventListener("resize", checkDevice);

    if (mobile) return;

    // Track mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Create cursor particles on move
      const color = hoverType === "green" 
        ? "rgba(57, 255, 20, 0.6)" 
        : hoverType === "purple"
        ? "rgba(139, 0, 255, 0.6)"
        : "rgba(0, 245, 255, 0.6)";

      // Generate a trail particle
      if (Math.random() < 0.35) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1,
          color,
          alpha: 1.0,
          life: 30 + Math.random() * 20
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // On-click burst effect
    const handleMouseClick = () => {
      const count = 12;
      const color = hoverType === "green" 
        ? "rgba(57, 255, 20, 0.9)" 
        : hoverType === "purple"
        ? "rgba(139, 0, 255, 0.9)"
        : "rgba(0, 245, 255, 0.9)";

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 4 + 2;
        sparks.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          color,
          alpha: 1.0,
          life: 40 + Math.random() * 30
        });
      }
    };

    // Global listener for hover behaviors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for parents / buttons with triggers
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".interactive-card") ||
        target.classList.contains("clickable");

      const inHackingSection = target.closest("#hacking") !== null;

      if (inHackingSection) {
        setHoverType("green");
      } else if (isInteractive) {
        const isPurple = target.closest(".purple-hover") !== null || target.classList.contains("purple-glow");
        setHoverType(isPurple ? "purple" : "cyan");
      } else {
        setHoverType("none");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    document.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Canvas particle loop
    const canvas = canvasRef.current;
    let animationId: number;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateFrame = () => {
      // 1. Move inner dot immediately
      if (innerCursorRef.current) {
        innerCursorRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      // 2. Lag outer ring
      const lagFactor = 0.14; // Magnetic constant
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * lagFactor;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * lagFactor;

      if (outerCursorRef.current) {
        outerCursorRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // 3. Draw particles on trail canvas
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = sparks.current.length - 1; i >= 0; i--) {
          const s = sparks.current[i];
          s.x += s.vx;
          s.y += s.vy;
          // Apply atmospheric friction
          s.vx *= 0.96;
          s.vy *= 0.96;
          s.life--;
          s.alpha = Math.max(0, s.life / 60);

          if (s.life <= 0) {
            sparks.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = s.alpha;
          ctx.shadowBlur = 4;
          ctx.shadowColor = s.color;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, hoverType, isMobile]);

  if (isMobile || !isVisible) {
    return null;
  }

  // Determine styling class for outer ring based on state
  let outerRingClass = "border border-white/40";
  if (hoverType === "cyan") {
    outerRingClass = "border border-ai-cyan bg-ai-cyan/10 scale-150 neon-shadow-cyan";
  } else if (hoverType === "green") {
    outerRingClass = "border border-hack-poison bg-hack-poison/15 scale-150 neon-shadow-green";
  } else if (hoverType === "purple") {
    outerRingClass = "border border-accent-purple bg-accent-purple/10 scale-150 neon-shadow-purple";
  }

  return (
    <>
      {/* Background Trail Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
      />

      {/* Inner Dot Cursor */}
      <div
        ref={innerCursorRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none z-50 transition-colors duration-150 ${
          hoverType === "green" 
            ? "bg-hack-poison text-glow-green" 
            : hoverType === "purple"
            ? "bg-accent-purple text-glow-purple"
            : "bg-ai-cyan text-glow-cyan"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)", backfaceVisibility: "hidden" }}
      />

      {/* Lagging Outer Ring Cursor */}
      <div
        ref={outerCursorRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out ${outerRingClass}`}
        style={{ transform: "translate3d(-100px, -100px, 0)", backfaceVisibility: "hidden" }}
      />
    </>
  );
}
