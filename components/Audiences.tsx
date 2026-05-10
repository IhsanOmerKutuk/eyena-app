"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GraduationCap, UserCheck, Building2, CheckCircle2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    label: "Öğrenciler",
    title: "Kendi Dikkat Haritanı Gör",
    description:
      "EYENA, ders süresindeki dikkat yoğunluğunu, en verimli çalışma saatlerini ve odak kayıplarını görsel raporlarla öğrenciye sunar.",
    benefits: [
      "Kişisel dikkat haritası ve zaman çizelgesi",
      "En verimli ders saatlerinin tespiti",
      "Odak kayıplarının nedenlerle birlikte analizi",
      "Haftalık ve aylık gelişim raporları",
    ],
  },
  {
    icon: UserCheck,
    label: "Öğretmenler",
    title: "Sınıfı Gerçek Zamanlı Takip Et",
    description:
      "Hangi öğrencinin dikkatinin dağıldığını anlık olarak görün, müdahale edin ve ders etkinliğini en üst düzeye taşıyın.",
    benefits: [
      "Sınıf geneli dikkat ısı haritası",
      "Bireysel öğrenci anlık uyarıları",
      "Ders içeriğiyle dikkat korelasyonu",
      "Otomatik sınıf raporu oluşturma",
    ],
  },
  {
    icon: Building2,
    label: "Kurum Sahipleri",
    title: "Kurumunuza Değer Katın",
    description:
      "Kapsamlı analitik dashboard ile kurumun genel performansını izleyin, velilerle şeffaf paylaşım yapın ve bayi ağına katılın.",
    benefits: [
      "Okul geneli performans raporu",
      "Öğretmen ve sınıf karşılaştırmalı analiz",
      "Velilerle paylaşılabilir raporlar",
      "Türkiye genelinde bayilik imkânı",
    ],
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const current = audiences[active];

  return (
    <section id="hedef-kitle" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">Hedef Kitle</span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Herkese Özel <span className="text-[#5BC8F5]">Çözümler</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Öğrenciden öğretmene, kurum sahibine kadar herkes için özelleştirilmiş içgörüler.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {audiences.map((a, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                active === i
                  ? "bg-[#5BC8F5] text-[#0A0A0A] shadow-[0_0_22px_rgba(91,200,245,0.45)]"
                  : "glass text-gray-300 hover:text-[#5BC8F5] hover:border-[#5BC8F5]/30"
              }`}
            >
              <a.icon size={17} />
              {a.label}
            </button>
          ))}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left */}
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#5BC8F5]/10 border border-[#5BC8F5]/25 flex items-center justify-center mb-6">
                  <current.icon className="text-[#5BC8F5]" size={26} />
                </div>
                <h3 className="font-[Orbitron] text-2xl font-bold text-white mb-4">
                  {current.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">{current.description}</p>
              </div>

              {/* Right: benefit list */}
              <div className="space-y-3">
                {current.benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex items-start gap-3 glass-light rounded-xl p-4"
                  >
                    <CheckCircle2 className="text-[#5BC8F5] mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-sm leading-relaxed">{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
