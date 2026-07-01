import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  px?: number; // projected X
  py?: number; // projected Y
  depthAlpha?: number;
}

export default function RotatingSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = 320;
    let height = canvas.height = 320;

    // Build the sphere's vertices
    const vertices: Point3D[] = [];
    const latBands = 12;
    const longBands = 12;
    const radius = 100;

    // Math: parametric sphere equations
    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands; // Latitude (0 to PI)
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= longBands; lon++) {
        const phi = (lon * Math.PI * 2) / longBands; // Longitude (0 to 2PI)
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = radius * sinTheta * cosPhi;
        const y = radius * cosTheta;
        const z = radius * sinTheta * sinPhi;

        vertices.push({ x, y, z });
      }
    }

    let angleX = 0.004;
    let angleY = 0.006;

    // Track mouse drift
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      mouseRef.current.x = mx * 0.01;
      mouseRef.current.y = my * 0.01;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = canvas.width = rect ? rect.width : 320;
      height = canvas.height = rect ? rect.height : 320;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render wireframe sphere
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse movement
      mouseRef.current.currentX += (mouseRef.current.x - mouseRef.current.currentX) * 0.08;
      mouseRef.current.currentY += (mouseRef.current.y - mouseRef.current.currentY) * 0.08;

      // Rotate around X and Y axes continuously, combined with mouse offset
      const currentAngleX = angleX + mouseRef.current.currentY * 0.3;
      const currentAngleY = angleY + mouseRef.current.currentX * 0.3;

      // Update constants
      angleX += 0.003;
      angleY += 0.004;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const focalLength = 220;
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Project all vertices
      const projectedPoints: Point3D[] = [];

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Rotate Y
        let rx1 = v.x * cosY - v.z * sinY;
        let rz1 = v.z * cosY + v.x * sinY;

        // Rotate X
        let ry2 = v.y * cosX - rz1 * sinX;
        let rz2 = rz1 * cosX + v.y * sinX;

        // Perspective depth translation
        const zDepth = rz2 + 180;
        
        if (zDepth > 10) {
          const scale = focalLength / zDepth;
          const px = rx1 * scale + centerX;
          const py = ry2 * scale + centerY;
          const alpha = Math.min(1, Math.max(0.08, (280 - rz2) / 380));

          projectedPoints.push({
            x: rx1,
            y: ry2,
            z: rz2,
            px,
            py,
            depthAlpha: alpha
          });
        } else {
          projectedPoints.push({ x: rx1, y: ry2, z: rz2 });
        }
      }

      // Helper to retrieve index in vertices grid array
      const getIndex = (lat: number, lon: number) => {
        return lat * (longBands + 1) + lon;
      };

      // 2. Draw wireframe connection lines
      ctx.lineWidth = 0.5;
      const isLight = document.querySelector(".light-mode-active") !== null;
      const purpleRGB = isLight ? "109, 40, 217" : "139, 0, 255";
      const cyanRGB = isLight ? "2, 132, 199" : "0, 245, 255";

      for (let lat = 0; lat < latBands; lat++) {
        for (let lon = 0; lon < longBands; lon++) {
          const pCurrent = projectedPoints[getIndex(lat, lon)];
          const pRight = projectedPoints[getIndex(lat, lon + 1)];
          const pDown = projectedPoints[getIndex(lat + 1, lon)];

          // Connect to right neighbor
          if (pCurrent.px && pRight.px && pCurrent.depthAlpha && pRight.depthAlpha) {
            const alpha = (pCurrent.depthAlpha + pRight.depthAlpha) * 0.5 * (isLight ? 0.35 : 0.25);
            ctx.strokeStyle = `rgba(${purpleRGB}, ${alpha})`; // Purple/Violet wireframe lines
            ctx.beginPath();
            ctx.moveTo(pCurrent.px, pCurrent.py!);
            ctx.lineTo(pRight.px, pRight.py!);
            ctx.stroke();
          }

          // Connect to down neighbor
          if (pCurrent.px && pDown.px && pCurrent.depthAlpha && pDown.depthAlpha) {
            const alpha = (pCurrent.depthAlpha + pDown.depthAlpha) * 0.5 * (isLight ? 0.35 : 0.25);
            ctx.strokeStyle = `rgba(${cyanRGB}, ${alpha})`; // Cyan/Blue wireframe vertical lines
            ctx.beginPath();
            ctx.moveTo(pCurrent.px, pCurrent.py!);
            ctx.lineTo(pDown.px, pDown.py!);
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes (small vertex dots)
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        if (p.px && p.depthAlpha) {
          ctx.beginPath();
          ctx.arc(p.px, p.py!, Math.max(0.8, 1.8 * p.depthAlpha), 0, Math.PI * 2);
          ctx.fillStyle = p.z < 0 
            ? `rgba(${cyanRGB}, ${p.depthAlpha * 0.8})` 
            : `rgba(${purpleRGB}, ${p.depthAlpha * 0.5})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block mx-auto max-w-full aspect-square pointer-events-none drop-shadow-[0_0_20px_rgba(139,0,255,0.2)]"
    />
  );
}
