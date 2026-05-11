'use client';

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  r: number;
  g: number;
  b: number;
  radius: number;
  blur: number;
}

const FADE_MS = 5000;
const DWELL_RADIUS = 25;
const DWELL_THRESHOLD_MS = 800;

function speedToStyle(
  speed: number,
  isDwelling: boolean
): { r: number; g: number; b: number; radius: number; blur: number } {
  if (isDwelling) {
    return { r: 255, g: 50, b: 50, radius: 8, blur: 30 };
  }
  if (speed > 400) {
    return { r: 40, g: 140, b: 255, radius: 3, blur: 10 };
  }
  if (speed > 150) {
    const t = (speed - 150) / 250;
    return {
      r: Math.round(40 * t + 50 * (1 - t)),
      g: Math.round(140 * t + 220 * (1 - t)),
      b: Math.round(255 * t + 80 * (1 - t)),
      radius: Math.round(3 * t + 5 * (1 - t)),
      blur: Math.round(10 * t + 18 * (1 - t)),
    };
  }
  return { r: 50, g: 220, b: 80, radius: 5, blur: 18 };
}

export default function CursorHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const points: TrailPoint[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let dwellX = 0;
    let dwellY = 0;
    let dwellStart = 0;
    let initialized = false;

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const x = e.clientX;
      const y = e.clientY;

      let speed = 0;
      if (initialized && lastTime > 0) {
        const dt = now - lastTime;
        if (dt > 0) {
          speed = (Math.hypot(x - lastX, y - lastY) / dt) * 1000;
        }
      }

      if (!initialized) {
        dwellX = x;
        dwellY = y;
        dwellStart = now;
        initialized = true;
      } else if (Math.hypot(x - dwellX, y - dwellY) > DWELL_RADIUS) {
        dwellX = x;
        dwellY = y;
        dwellStart = now;
      }

      const isDwelling = now - dwellStart > DWELL_THRESHOLD_MS;
      const style = speedToStyle(speed, isDwelling);

      points.push({ x, y, timestamp: now, ...style });

      lastX = x;
      lastY = y;
      lastTime = now;
    };

    window.addEventListener('mousemove', onMouseMove);

    let rafId: number;

    const draw = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let i = 0;
      while (i < points.length && now - points[i].timestamp > FADE_MS) i++;
      if (i > 0) points.splice(0, i);

      for (const p of points) {
        const age = now - p.timestamp;
        const alpha = 1 - age / FADE_MS;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = p.blur;
        ctx.shadowColor = `rgb(${p.r},${p.g},${p.b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
