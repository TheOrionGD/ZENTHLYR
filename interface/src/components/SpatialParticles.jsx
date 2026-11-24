import React, { useEffect, useRef } from 'react';

export default function SpatialParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.floor(Math.min(window.innerWidth, 1400) / 14);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.3 - 0.12, // subtle upward drift
      pulse: Math.random() * Math.PI,
      pulseSpeed: 0.015 + Math.random() * 0.02
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Position ratio across horizontal screen: 0.0 (far left) to 1.0 (far right)
        const t = Math.max(0, Math.min(1, p.x / canvas.width));

        // Exact Monochromatic Palette Interpolation:
        // Left: Deep Charcoal (#31373D: 49, 55, 61) / Graphite (#4F5459: 79, 84, 89)
        // Right: Mist Grey (#D9DDE0: 217, 221, 224) / Soft White (#F4F5F6: 244, 245, 246)
        const r = Math.round(49 + t * (244 - 49));
        const g = Math.round(55 + t * (245 - 55));
        const b = Math.round(61 + t * (246 - 61));
        const alpha = 0.3 + t * 0.45; // subtle luminescence on the right

        const currentRadius = p.radius + Math.sin(p.pulse) * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowBlur = 6 + t * 12;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
