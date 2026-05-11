"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── 1. Gaze Trace ─────────────────────────────────────────────── */
function GazeTraceAnimation() {
  const widths = [100, 95, 100, 88, 62];
  const STEP = 1.5;
  const DURATION = 1.3;
  const TOTAL = widths.length * STEP;

  return (
    <div className="mt-5 space-y-3 relative">
      {widths.map((w, i) => (
        <div key={i} className="relative h-5 flex items-center">
          <div
            className="h-1.5 rounded-full bg-white/10"
            style={{ width: `${w}%` }}
          />
          <motion.div
            className="absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-[#5BC8F5]"
            style={{ boxShadow: "0 0 10px rgba(91,200,245,0.95)" }}
            animate={{
              left: ["0%", `${w - 4}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: DURATION,
              delay: i * STEP,
              repeat: Infinity,
              repeatDelay: TOTAL - DURATION,
              ease: "linear",
            }}
          />
        </div>
      ))}

      {/* Eye watermark */}
      <motion.div
        className="absolute bottom-0 right-0 pointer-events-none"
        animate={{ opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
          <ellipse cx="15" cy="11" rx="14" ry="9" stroke="#5BC8F5" strokeWidth="1.5" />
          <circle cx="15" cy="11" r="4.5" fill="#5BC8F5" />
          <circle cx="16.5" cy="9.5" r="1.8" fill="white" opacity="0.7" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── 2. Neural Network ─────────────────────────────────────────── */
function NeuralNetworkAnimation() {
  const nodes = [
    { x: 12, y: 50 },
    { x: 35, y: 22 },
    { x: 35, y: 78 },
    { x: 60, y: 36 },
    { x: 60, y: 64 },
    { x: 83, y: 50 },
    { x: 60, y: 50 },
  ];

  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 3], [2, 4],
    [3, 5], [4, 5],
    [3, 6], [4, 6],
  ];

  return (
    <div className="mt-4 w-full" style={{ height: 110 }}>
      <svg width="100%" height="100%" viewBox="0 0 95 100">
        {/* Static lines */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(91,200,245,0.18)"
            strokeWidth="0.9"
          />
        ))}

        {/* Pulse dots */}
        {edges.map(([a, b], i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#5BC8F5"
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.1,
              delay: i * 0.22,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y}
            r="5"
            fill="rgba(8,20,42,0.95)"
            stroke="#5BC8F5"
            strokeWidth="1"
            animate={{ r: [4.5, 5.5, 4.5], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2, delay: i * 0.28, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── 3. Tobii Logo ─────────────────────────────────────────────── */
function TobiiLogoAnimation() {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      {/* Wordmark */}
      <div className="flex items-center gap-0.5">
        {["T", "O", "B", "I", "I"].map((ch, i) => (
          <motion.span
            key={i}
            className="font-[Orbitron] text-3xl font-bold text-white/90 tracking-widest"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* Two eye dots (Tobii brand motif) */}
      <div className="flex gap-8">
        {[0, 0.5].map((d, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#5BC8F5]"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, delay: d, repeat: Infinity }}
          />
        ))}
      </div>

      <span className="text-[10px] text-white/35 tracking-[0.25em] uppercase">
        Powered by Tobii
      </span>
    </div>
  );
}

/* ─── 4. Circular Flow ──────────────────────────────────────────── */
function CircularFlowAnimation() {
  const nodes = [
    { cx: 50, cy: 16, label: "Öğ", sub: "Öğrenci" },
    { cx: 83, cy: 74, label: "Öğt", sub: "Öğretmen" },
    { cx: 17, cy: 74, label: "Sys", sub: "Sistem" },
  ];

  const STEP = 1.3;
  const DUR = 1.1;
  const TOTAL = nodes.length * STEP;

  return (
    <div className="mt-3 w-full" style={{ height: 120 }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {/* Static dashed lines */}
        {nodes.map((_, i) => {
          const from = nodes[i];
          const to = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={i}
              x1={from.cx} y1={from.cy}
              x2={to.cx} y2={to.cy}
              stroke="rgba(91,200,245,0.2)"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
          );
        })}

        {/* Animated arrow dots */}
        {nodes.map((_, i) => {
          const from = nodes[i];
          const to = nodes[(i + 1) % nodes.length];
          return (
            <motion.circle
              key={i}
              r="3"
              fill="#5BC8F5"
              animate={{
                cx: [from.cx, to.cx],
                cy: [from.cy, to.cy],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: DUR,
                delay: i * STEP,
                repeat: Infinity,
                repeatDelay: TOTAL - DUR,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Node circles */}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.cx} cy={n.cy} r="12"
              fill="rgba(91,200,245,0.08)"
              stroke="#5BC8F5"
              strokeWidth="1"
              animate={{ fill: ["rgba(91,200,245,0.06)", "rgba(91,200,245,0.2)", "rgba(91,200,245,0.06)"] }}
              transition={{ duration: DUR, delay: i * STEP, repeat: Infinity, repeatDelay: TOTAL - DUR }}
            />
            <text
              x={n.cx} y={n.cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#5BC8F5"
              fontSize="5.5"
              fontWeight="bold"
            >
              {n.label}
            </text>
            <text
              x={n.cx} y={n.cy + 19}
              textAnchor="middle"
              fill="rgba(255,255,255,0.38)"
              fontSize="5"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── 5. MEB Logo ───────────────────────────────────────────────── */
function MebLogoAnimation() {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Milli_E%C4%9Fitim_Bakanl%C4%B1%C4%9F%C4%B1_Logo.svg"
        alt="T.C. Millî Eğitim Bakanlığı Logo"
        className="h-16 w-16 object-contain"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span className="text-[10px] text-white/35 tracking-[0.18em] uppercase text-center">
        T.C. Millî Eğitim Bakanlığı Uyumlu
      </span>
    </div>
  );
}

/* ─── 6. Bell Alert ─────────────────────────────────────────────── */
function BellAlertAnimation() {
  return (
    <div className="mt-5 flex flex-col items-center gap-4">
      {/* Bell + ripple rings */}
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#5BC8F5]"
            style={{ width: 40 + i * 16, height: 40 + i * 16 }}
            animate={{ opacity: [0.6, 0], scale: [0.85, 1.4] }}
            transition={{
              duration: 1.6,
              delay: i * 0.45,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          className="relative z-10 w-10 h-10 rounded-full bg-[#5BC8F5]/15 flex items-center justify-center"
          animate={{ rotate: [-10, 10, -10, 10, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 2.2 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="#5BC8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="#5BC8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Attention level bar */}
      <div className="w-full">
        <div className="text-[10px] text-white/35 mb-1.5 text-center tracking-wide">
          Dikkat Seviyesi
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#5BC8F5] to-[#5BC8F5]/50"
            animate={{ width: ["78%", "32%", "14%", "48%", "78%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Feature card dispatcher ───────────────────────────────────── */
function CardAnimation({ type }: { type: string }) {
  if (type === "gaze")   return <GazeTraceAnimation />;
  if (type === "neural") return <NeuralNetworkAnimation />;
  if (type === "tobii")  return <TobiiLogoAnimation />;
  if (type === "flow")   return <CircularFlowAnimation />;
  if (type === "meb")    return <MebLogoAnimation />;
  if (type === "bell")   return <BellAlertAnimation />;
  return null;
}

/* ─── Feature data ──────────────────────────────────────────────── */
const features = [
  {
    title: "Gerçek Zamanlı Göz Takibi",
    description:
      "Tobii teknolojisi ile 60 FPS hızında öğrencinin bakış noktasını, göz hareketlerini ve dikkat yoğunluğunu milisaniye hassasiyetle tespit eder.",
    wide: true,
    animation: "gaze",
  },
  {
    title: "Yapay Zeka Analizi",
    description:
      "Öğrenci davranışlarını analiz eden AI modeli, dikkat dağınıklığını ve odaklanma süreçlerini otomatik raporlar.",
    wide: false,
    animation: "neural",
  },
  {
    title: "Tobii Entegrasyonu",
    description:
      "İsveçli Tobii'nin endüstri standardı donanımıyla sorunsuz, sıfır gecikme entegrasyonu.",
    wide: false,
    animation: "tobii",
  },
  {
    title: "Kurumsal Raporlama Paneli",
    description:
      "Okul müdürleri ve kurum yöneticileri için kapsamlı analitik dashboard ile tüm sınıfların anlık durumu.",
    wide: false,
    animation: "flow",
  },
  {
    title: "MEB Uyumlu Sistem",
    description:
      "Türk Milli Eğitim Bakanlığı müfredatına ve standartlarına tam uyumlu altyapı ile raporlama formatı.",
    wide: false,
    animation: "meb",
  },
  {
    title: "Anlık Dikkat Uyarıları",
    description:
      "Öğrenci dikkat düşüşlerinde öğretmene anlık bildirim gönderir, müdahale fırsatı yaratır.",
    wide: false,
    animation: "bell",
  },
];

/* ─── Main export ───────────────────────────────────────────────── */
export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ozellikler" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">
              Temel Özellikler
            </span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Teknoloji ile <span className="text-[#5BC8F5]">Güçlü</span> Eğitim
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            EYENA'nın beş temel bileşeni sınıf yönetimini ve öğrenci başarısını dönüştürür.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass rounded-2xl p-7 cursor-pointer group transition-all duration-300
                hover:border-[#5BC8F5]/40 hover:shadow-[0_0_28px_rgba(91,200,245,0.12)]
                ${f.wide ? "lg:col-span-2" : ""}`}
            >
              <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              <CardAnimation type={f.animation} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
