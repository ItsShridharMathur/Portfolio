import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function NeuralNetworkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Projection constants
    const focalLength = 320;
    const nodeCount = window.innerWidth < 768 ? 40 : 85; // optimized for mobile
    const nodes: Node3D[] = [];

    // Initialize nodes scattered inside a 3D sphere/box
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.random() * 240 + 60; // sphere radius

      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        baseSize: Math.random() * 2.5 + 1.5,
        color: Math.random() < 0.7 ? "#00f5ff" : "#0066ff", // Cyan or electric blue
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Rotation angles
    let angleY = 0.0012; // slow continuous horizontal rotation
    let angleX = 0.0006; // slow continuous vertical rotation
    
    // Track mouse hover positions
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - width / 2;
      mouseRef.current.y = e.clientY - height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Main 3D render loop
    const render = () => {
      const isLight = document.querySelector(".light-mode-active") !== null;
      ctx.clearRect(0, 0, width, height);

      if (!isLight) {
        // Create a background ambient radial depth gradient
        const grad = ctx.createRadialGradient(
          width / 2, height / 2, 50,
          width / 2, height / 2, width * 0.8
        );
        grad.addColorStop(0, "rgba(10, 10, 15, 0.4)");
        grad.addColorStop(1, "rgba(5, 5, 8, 0.95)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Trigonometric cache
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected: { x: number; y: number; z: number; size: number; color: string; alpha: number }[] = [];

      // 1. Rotate, apply mouse gravity, and project coordinates
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Slowly rotate on continuous orbit
        let rx1 = node.x * cosY - node.z * sinY;
        let rz1 = node.z * cosY + node.x * sinY;
        
        let ry2 = node.y * cosX - rz1 * sinX;
        let rz2 = rz1 * cosX + node.y * sinX;

        // Apply back to base nodes slowly to rotate scene structure
        node.x = rx1;
        node.y = ry2;
        node.z = rz2;

        // Add subtle drifting vibration
        node.pulsePhase += node.pulseSpeed;

        // Interactive mouse gravity pull
        let pullX = 0;
        let pullY = 0;
        if (mouseRef.current.active) {
          const dx = rx1 - mouseRef.current.x;
          const dy = ry2 - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) * 0.05;
            pullX = (dx / dist) * force;
            pullY = (dy / dist) * force;
          }
        }

        // Project to 2D
        const zoom = 1.0;
        const zDepth = rz2 + 350; // offset back
        
        if (zDepth > 20) {
          const scale = (focalLength / zDepth) * zoom;
          const px = (rx1 - pullX) * scale + width / 2;
          const py = (ry2 - pullY) * scale + height / 2;

          // Pulse sizing
          const sizeMult = 1 + Math.sin(node.pulsePhase) * 0.25;
          const size = Math.max(0.5, node.baseSize * scale * sizeMult * 0.25);
          
          // Alpha based on depth
          const alpha = Math.min(1, Math.max(0.1, (500 - rz2) / 600));

          // Resolve light mode specific node color
          const activeColor = isLight
            ? (node.color === "#00f5ff" ? "#0284c7" : "#1d4ed8")
            : node.color;

          projected.push({
            x: px,
            y: py,
            z: rz2,
            size,
            color: activeColor,
            alpha
          });
        }
      }

      // 2. Draw connections (Lines) between nodes
      const maxDist = width < 768 ? 60 : 100;
      for (let i = 0; i < projected.length; i++) {
        const n1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const n2 = projected[j];
          
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // Smooth alpha falloff near distance boundaries
            const lineAlpha = (1 - (dist / maxDist)) * n1.alpha * n2.alpha * (isLight ? 0.35 : 0.25);
            
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // Connect lines with gradients representing information flow
            const lineGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            const rgb1 = n1.color === "#0284c7" || n1.color === "#00f5ff" ? "2, 132, 199" : "29, 78, 216";
            const rgb2 = n2.color === "#0284c7" || n2.color === "#00f5ff" ? "2, 132, 199" : "29, 78, 216";
            
            lineGrad.addColorStop(0, `rgba(${rgb1}, ${lineAlpha})`);
            lineGrad.addColorStop(1, `rgba(${rgb2}, ${lineAlpha})`);
            
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = Math.max(0.25, (1 - dist / maxDist) * (isLight ? 1.5 : 1.2));
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        // Apply node glows for closer points
        if (p.z < 100) {
          ctx.shadowBlur = p.size * 2.5;
          ctx.shadowColor = p.color;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 select-none overflow-hidden bg-[#0a0a0f]">
      {/* Visual cybernetic background textures */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-dot opacity-40 pointer-events-none"></div>
      
      {/* Actual dynamic Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-70"
      />

      {/* Futuristic bottom boundary gradient masking to deep black */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  );
}
