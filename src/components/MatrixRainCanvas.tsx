import { useEffect, useRef } from "react";

interface MatrixRainCanvasProps {
  isFullscreen?: boolean;
}

export default function MatrixRainCanvas({ isFullscreen = false }: MatrixRainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      if (isFullscreen) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        const parent = canvas.parentElement;
        canvas.width = parent ? parent.clientWidth : window.innerWidth;
        canvas.height = parent ? parent.clientHeight : 500;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters list (Mix of Katakana, binary, and math operators)
    const charString = "0101ABCDEF0101アイウエオカキクケコサシスセソ0101";
    const chars = charString.split("");
    const fontSize = 14;

    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    // Re-initialize columns on resize
    const reinitColumns = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100); // randomize start depths
    };

    // Draw frame
    const draw = () => {
      // Semi-transparent background box to create trails
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon-green text setting
      ctx.fillStyle = "#39ff14";
      ctx.font = `bold ${fontSize}px "Share Tech Mono"`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#00ff41";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Reset drop position or increment downward
        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Delay start slightly to prevent layout shifts
    const startTimer = setTimeout(() => {
      reinitColumns();
      draw();
    }, 50);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isFullscreen]);

  return (
    <canvas
      ref={canvasRef}
      className={`block opacity-35 select-none pointer-events-none ${
        isFullscreen ? "fixed inset-0 z-[100] w-screen h-screen bg-[#0a0a0f]" : "absolute inset-0 w-full h-full"
      }`}
    />
  );
}
