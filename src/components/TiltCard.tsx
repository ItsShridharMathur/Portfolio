import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  accentColor?: "cyan" | "purple" | "green";
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  accentColor = "cyan"
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: "" });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768 ||
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0)
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Cursor position within the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-1 to 1)
    const normX = (x / width) * 2 - 1;
    const normY = (y / height) * 2 - 1;

    // Calculate rotation angles
    const tiltX = -(normY * maxTilt).toFixed(2);
    const tiltY = (normX * maxTilt).toFixed(2);

    // Apply 3D perspective rotation
    setTransformStyle(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);

    // Glare position calculation
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;
    setGlareStyle({
      opacity: 0.35,
      transform: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    // Reset transforms smoothly
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0, transform: "" });
  };

  const borderClass =
    accentColor === "green"
      ? "hover:border-hack-poison hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]"
      : accentColor === "purple"
      ? "hover:border-accent-purple hover:shadow-[0_0_15px_rgba(139,0,255,0.15)]"
      : "hover:border-ai-cyan hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-[#1a1a2e] bg-[#05050a] backdrop-blur-xl transition-all duration-300 ease-out select-none overflow-hidden interactive-card ${borderClass} ${className}`}
      style={{
        transform: isMobile ? undefined : transformStyle,
        transition: isMobile ? undefined : "transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Dynamic Glare Overlay */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: glareStyle.transform,
            opacity: glareStyle.opacity
          }}
        />
      )}

      {/* Actual inner card content, preserving 3D spacing */}
      <div style={{ transform: isMobile ? undefined : "translateZ(10px)" }}>
        {children}
      </div>
    </div>
  );
}
