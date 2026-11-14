"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };

/**
 * Full-screen interactive "neural constellation".
 * Nodes drift, link up when close, and lean toward the pointer.
 * Pauses when the tab is hidden; renders a single still frame for reduced-motion users.
 */
export default function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    let particles: P[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const LINK = 140;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.max(40, Math.floor((w * h) / 12000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        hue: Math.random() < 0.7 ? 188 : 265,
      }));
    };

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!reduce) {
          // gentle flow field so motion feels organic rather than linear
          p.vx += Math.cos(p.y * 0.004 + t) * 0.004;
          p.vy += Math.sin(p.x * 0.004 + t) * 0.004;
          if (pointer.active) {
            const dx = pointer.x - p.x, dy = pointer.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 220 * 220) {
              const f = 0.00006 * (220 * 220 - d2) / 220;
              p.vx += (dx / Math.sqrt(d2 + 1)) * f;
              p.vy += (dy / Math.sqrt(d2 + 1)) * f;
            }
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = 1 - Math.sqrt(d2) / LINK;
            ctx.strokeStyle = `hsla(${a.hue}, 100%, 70%, ${o * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        let glow = 0.55;
        if (pointer.active) {
          const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
          if (d < 180) glow = 0.55 + (1 - d / 180) * 0.45;
        }
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${glow})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="neural-field" aria-hidden="true" />;
}
