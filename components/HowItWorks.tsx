"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";

// ─── Step 1: Calibration Animation ───────────────────────────────────────────
const DOT_POSITIONS = [
  { x: 0, y: 0 },   // top-left
  { x: 1, y: 0 },   // top-right
  { x: 1, y: 1 },   // bottom-right
  { x: 0, y: 1 },   // bottom-left
];

function CalibrationAnimation({ active }: { active: boolean }) {
  const [currentDot, setCurrentDot] = useState(-1);
  const [ripples, setRipples] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) {
      timeouts.current.forEach(clearTimeout);
      setCurrentDot(-1);
      setRipples([]);
      setDone(false);
      return;
    }

    const sequence = async () => {
      setDone(false);
      setRipples([]);
      for (let i = 0; i < 4; i++) {
        await new Promise<void>((res) => {
          const t = setTimeout(() => {
            setCurrentDot(i);
            res();
          }, i === 0 ? 400 : 800);
          timeouts.current.push(t);
        });
        await new Promise<void>((res) => {
          const t = setTimeout(() => {
            setRipples((prev) => [...prev, i]);
            res();
          }, 300);
          timeouts.current.push(t);
        });
      }
      await new Promise<void>((res) => {
        const t = setTimeout(() => {
          setDone(true);
          res();
        }, 600);
        timeouts.current.push(t);
      });
      // restart loop
      await new Promise<void>((res) => {
        const t = setTimeout(() => {
          setCurrentDot(-1);
          setRipples([]);
          setDone(false);
          res();
        }, 1800);
        timeouts.current.push(t);
      });
    };

    let running = true;
    const loop = async () => {
      while (running) {
        await sequence();
        await new Promise<void>((res) => {
          const t = setTimeout(res, 200);
          timeouts.current.push(t);
        });
      }
    };
    loop();

    return () => {
      running = false;
      timeouts.current.forEach(clearTimeout);
    };
  }, [active]);

  const pad = 28;
  const size = 120;
  const inner = size - pad * 2;

  // circle position
  const cx = currentDot >= 0 ? pad + DOT_POSITIONS[currentDot].x * inner : pad;
  const cy = currentDot >= 0 ? pad + DOT_POSITIONS[currentDot].y * inner : pad;

  return (
    <div className="relative w-[120px] h-[120px] mx-auto">
      {/* Dots */}
      {DOT_POSITIONS.map((pos, i) => {
        const dx = pad + pos.x * inner;
        const dy = pad + pos.y * inner;
        const hasRipple = ripples.includes(i);
        return (
          <div
            key={i}
            className="absolute"
            style={{ left: dx - 5, top: dy - 5 }}
          >
            {/* ripple rings */}
            {hasRipple && (
              <>
                <motion.div
                  className="absolute rounded-full border border-[#5BC8F5]"
                  style={{ left: -8, top: -8, width: 26, height: 26 }}
                  initial={{ opacity: 0.8, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute rounded-full border border-[#5BC8F5]/50"
                  style={{ left: -8, top: -8, width: 26, height: 26 }}
                  initial={{ opacity: 0.5, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 3 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                />
              </>
            )}
            {/* dot */}
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-white"
              animate={hasRipple ? { scale: [1, 1.4, 1], backgroundColor: ["#ffffff", "#5BC8F5", "#ffffff"] } : {}}
              transition={{ duration: 0.4 }}
            />
          </div>
        );
      })}

      {/* Moving blue circle */}
      {currentDot >= 0 && !done && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-[#5BC8F5] shadow-[0_0_12px_4px_rgba(91,200,245,0.6)]"
          style={{ left: cx - 8, top: cy - 8 }}
          animate={{ left: cx - 8, top: cy - 8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}

      {/* Done text */}
      {done && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-[#5BC8F5] text-[10px] font-bold text-center leading-tight font-[Orbitron]">
            Kalibrasyon<br />Tamamlandı
          </span>
        </motion.div>
      )}
    </div>
  );
}

// ─── Step 2: AI Thinking Animation ───────────────────────────────────────────
function AIAnimation({ active }: { active: boolean }) {
  const nodes = [
    { cx: 60, cy: 30 },
    { cx: 20, cy: 65 },
    { cx: 100, cy: 65 },
    { cx: 35, cy: 100 },
    { cx: 85, cy: 100 },
    { cx: 60, cy: 80 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5], [3, 5], [4, 5], [0, 5],
  ];

  return (
    <div className="relative w-[120px] h-[120px] mx-auto flex flex-col items-center justify-center gap-2">
      <svg width="120" height="110" viewBox="0 0 120 110">
        {/* edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="#5BC8F5"
            strokeWidth="1"
            strokeOpacity="0.3"
            animate={active ? { strokeOpacity: [0.15, 0.6, 0.15] } : { strokeOpacity: 0.15 }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
        {/* data pulse along edges */}
        {active && edges.slice(0, 4).map(([a, b], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2.5"
            fill="#5BC8F5"
            initial={{ cx: nodes[a].cx, cy: nodes[a].cy, opacity: 0 }}
            animate={{
              cx: [nodes[a].cx, nodes[b].cx],
              cy: [nodes[a].cy, nodes[b].cy],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
          />
        ))}
        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r="5"
            fill="#0A0A0A"
            stroke="#5BC8F5"
            strokeWidth="1.5"
            animate={active ? { r: [5, 6.5, 5], strokeOpacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {/* thinking dots */}
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#5BC8F5]"
            animate={active ? { opacity: [0.2, 1, 0.2], y: [0, -3, 0] } : { opacity: 0.2 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Step 3: Heatmap Animation ────────────────────────────────────────────────
const BLOBS = [
  { cx: "35%", cy: "45%", color: "#EF4444", size: 52, delay: 0 },
  { cx: "62%", cy: "38%", color: "#3B82F6", size: 44, delay: 0.3 },
  { cx: "50%", cy: "65%", color: "#22C55E", size: 38, delay: 0.6 },
  { cx: "75%", cy: "58%", color: "#EF4444", size: 30, delay: 0.9 },
  { cx: "22%", cy: "60%", color: "#3B82F6", size: 28, delay: 1.1 },
];

function HeatmapAnimation({ active }: { active: boolean }) {
  return (
    <div className="relative w-[120px] h-[100px] mx-auto">
      {/* monitor frame */}
      <div className="absolute inset-0 rounded-lg border border-[#5BC8F5]/40 bg-[#0A1A2A]/80 overflow-hidden">
        {/* blobs */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.cx,
              top: b.cy,
              width: b.size,
              height: b.size,
              transform: "translate(-50%,-50%)",
              background: `radial-gradient(circle, ${b.color}cc 0%, ${b.color}44 55%, transparent 80%)`,
              filter: "blur(6px)",
            }}
            animate={active ? {
              scale: [1, 1.25, 0.9, 1.15, 1],
              opacity: [0.7, 1, 0.6, 0.9, 0.7],
            } : { opacity: 0.4 }}
            transition={{ duration: 2.8, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          />
        ))}
        {/* scanline overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(91,200,245,0.03) 3px, rgba(91,200,245,0.03) 4px)",
          }}
        />
      </div>
      {/* monitor stand */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-3 flex flex-col items-center">
        <div className="w-px h-2 bg-[#5BC8F5]/40" />
        <div className="w-8 h-px bg-[#5BC8F5]/40" />
      </div>
    </div>
  );
}

// ─── Connector Line ───────────────────────────────────────────────────────────
function ConnectorLine({ progress }: { progress: number }) {
  // progress 0-1: 0=none, 0.5=halfway, 1=full
  return (
    <div className="hidden lg:flex absolute top-[62px] left-0 right-0 items-center pointer-events-none px-[16.66%]">
      <div className="relative flex-1 h-px bg-white/10">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5BC8F5] to-[#5BC8F5]/60"
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {/* moving glow dot */}
        {progress > 0 && progress < 1 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5BC8F5] shadow-[0_0_8px_4px_rgba(91,200,245,0.7)]"
            style={{ left: `calc(${Math.min(progress, 1) * 100}% - 4px)` }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const STEP_DURATION = 3800; // ms per step

const STEPS = [
  {
    number: "01",
    title: "EYENA Kalibrasyonu",
    description:
      "EYENA platformu üzerinden kullanıcı göz hareketlerini kalibre ederek sisteme giriş yapar.",
  },
  {
    number: "02",
    title: "Yapay Zeka Devreye Girer",
    description:
      "EYENA'nın AI motoru, öğrenci göz verilerini gerçek zamanlı işler. Dikkat kalıplarını tanır, anormallik tespiti yapar ve davranışları yorumlar.",
  },
  {
    number: "03",
    title: "Rapor Çıktısı",
    description:
      "Öğretmen, öğrenci ve kurum yöneticisi panellerine özel ayrıntılı dikkat, odak ve katılım raporları otomatik olarak hazırlanır ve paylaşılır.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setActiveStep(0);
    setLineProgress(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 3;
        // line goes 0 → 0.5 → 1 → reset
        setLineProgress(next === 0 ? 0 : next === 1 ? 0.5 : 1);
        return next;
      });
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="nasil-calisir" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5BC8F5]/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">Süreç</span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Nasıl <span className="text-[#5BC8F5]">Çalışır?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Üç basit adımda sınıfınızı akıllı bir eğitim ortamına dönüştürün.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative">
          <ConnectorLine progress={lineProgress} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isDone = activeStep > i || (activeStep === 0 && i === 2 && lineProgress === 0);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.18 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Animation box */}
                  <div className="relative mb-7">
                    <motion.div
                      className="w-[124px] h-[124px] rounded-3xl flex items-center justify-center"
                      animate={{
                        borderColor: isActive ? "rgba(91,200,245,0.7)" : "rgba(91,200,245,0.2)",
                        boxShadow: isActive
                          ? "0 0 24px rgba(91,200,245,0.35)"
                          : "0 0 0px rgba(91,200,245,0)",
                        backgroundColor: isActive ? "rgba(91,200,245,0.1)" : "rgba(91,200,245,0.04)",
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ border: "1px solid" }}
                    >
                      {i === 0 && <CalibrationAnimation active={isActive} />}
                      {i === 1 && <AIAnimation active={isActive} />}
                      {i === 2 && <HeatmapAnimation active={isActive} />}
                    </motion.div>

                    {/* Step number pill */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
                      animate={{
                        backgroundColor: isActive || isDone ? "#5BC8F5" : "#1a2a3a",
                        boxShadow: isActive ? "0 0 14px rgba(91,200,245,0.7)" : "none",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="font-[Orbitron] text-[#0A0A0A] text-xs font-bold">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  <motion.h3
                    className="font-semibold text-xl mb-3"
                    animate={{ color: isActive ? "#5BC8F5" : "#ffffff" }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-gray-400 leading-relaxed text-sm max-w-xs">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
