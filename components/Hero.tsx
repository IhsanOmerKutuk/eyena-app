"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Zap, BarChart3 } from "lucide-react";

function EyeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf: number;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const t = frame * 0.018;

      // Pupil target using Lissajous-style path
      const px = cx + Math.cos(t * 1.1) * 38;
      const py = cy + Math.sin(t * 0.7) * 18;

      // --- Eye white (sclera) ---
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 130, 65, 0, 0, Math.PI * 2);
      const scleraGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 130);
      scleraGrad.addColorStop(0, "rgba(10,20,30,1)");
      scleraGrad.addColorStop(1, "rgba(5,10,18,1)");
      ctx.fillStyle = scleraGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(91,200,245,0.55)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // --- Iris ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 44, 0, Math.PI * 2);
      const irisGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 44);
      irisGrad.addColorStop(0, "rgba(91,200,245,0.9)");
      irisGrad.addColorStop(0.5, "rgba(30,120,160,0.85)");
      irisGrad.addColorStop(1, "rgba(8,35,50,1)");
      ctx.fillStyle = irisGrad;
      ctx.fill();

      // Iris detail lines
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 18, cy + Math.sin(angle) * 18);
        ctx.lineTo(cx + Math.cos(angle) * 42, cy + Math.sin(angle) * 42);
        ctx.strokeStyle = "rgba(91,200,245,0.15)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // --- Pupil group (moves together) ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      // Pupil glow ring
      ctx.beginPath();
      ctx.arc(px, py, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(91,200,245,0.45)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Eye highlight
      ctx.beginPath();
      ctx.ellipse(px - 7, py - 7, 5, 3, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fill();
      ctx.restore();

      // --- Scanning ray from pupil ---
      const rayAlpha = (Math.sin(t * 2) * 0.5 + 0.5) * 0.4;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px, py);
      const rayLen = 90 + Math.sin(t) * 20;
      const rayAngle = t * 0.5;
      ctx.lineTo(px + Math.cos(rayAngle) * rayLen, py + Math.sin(rayAngle) * rayLen);
      ctx.strokeStyle = `rgba(91,200,245,${rayAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // --- Eyelid curves ---
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy);
      ctx.quadraticCurveTo(cx, cy - 70, cx + 130, cy);
      ctx.strokeStyle = "rgba(91,200,245,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy);
      ctx.quadraticCurveTo(cx, cy + 70, cx + 130, cy);
      ctx.stroke();
      ctx.restore();

      // --- Corner HUD labels ---
      ctx.save();
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "rgba(91,200,245,0.5)";
      ctx.fillText("TARAMA", cx - 125, cy - 52);
      ctx.fillText("AKTİF", cx + 88, cy - 52);
      ctx.fillText(`FPS: 60`, cx - 125, cy + 64);
      const dikkat = 90 + Math.round(Math.sin(t * 0.3) * 5);
      ctx.fillText(`DİKKAT: ${dikkat}%`, cx + 68, cy + 64);
      ctx.restore();

      // --- Outer scan ring ---
      ctx.save();
      ctx.beginPath();
      const scanR = 150 + Math.sin(t * 0.8) * 8;
      ctx.arc(cx, cy, scanR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(91,200,245,${0.05 + Math.sin(t) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      frame++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={280}
      className="w-full max-w-md mx-auto drop-shadow-[0_0_40px_rgba(91,200,245,0.4)]"
      aria-label="Göz takibi animasyonu"
    />
  );
}

const stats = [
  { icon: Eye, value: "500+", label: "Sınıf Analizi" },
  { icon: BarChart3, value: "98%", label: "Doğruluk Oranı" },
  { icon: Zap, value: "60 FPS", label: "Gerçek Zamanlı" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden grid-bg">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#5BC8F5]/4 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#5BC8F5]/3 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#5BC8F5] animate-pulse" />
              <span className="text-sm text-[#5BC8F5] font-medium tracking-wide">
                Tobii Teknolojisi ile Güçlü
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[Orbitron] text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Dikkat,</span>
              <br />
              <span className="text-[#5BC8F5] neon-text">Görünür</span>
              <br />
              <span className="text-white">Hale Geliyor</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              EYENA, göz takibi ve yapay zeka ile öğrencilerin sınıf içi dikkat,
              odaklanma ve katılım düzeylerini gerçek zamanlı olarak analiz eder.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#bayi"
                className="flex items-center gap-2 px-8 py-4 bg-[#5BC8F5] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 shadow-[0_0_30px_rgba(91,200,245,0.5)] cursor-pointer"
              >
                Çözüm Ortaklığı
                <ArrowRight size={18} />
              </a>
              <a
                href="#iletisim"
                className="flex items-center gap-2 px-8 py-4 border border-[#5BC8F5]/40 text-[#5BC8F5] font-medium rounded-xl hover:bg-[#5BC8F5]/10 transition-all duration-200 cursor-pointer"
              >
                Bize Ulaşın
              </a>
            </motion.div>
          </div>

          {/* Right: eye canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Ambient rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-80 h-80 rounded-full border border-[#5BC8F5]/8 animate-ping"
                style={{ animationDuration: "3.5s" }}
              />
              <div
                className="absolute w-56 h-56 rounded-full border border-[#5BC8F5]/12 animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
            </div>
            <EyeCanvas />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5BC8F5]/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="text-[#5BC8F5]" size={24} />
              </div>
              <div>
                <div className="font-[Orbitron] text-2xl font-bold text-[#5BC8F5]">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest">KAYDIRIN</span>
        <div className="w-5 h-8 border border-gray-700 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-[#5BC8F5] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
