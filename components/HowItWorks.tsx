"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings2, Brain, FileBarChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings2,
    title: "Tobii Cihazı Kurulumu",
    description:
      "Tobii göz takibi donanımı sınıfa monte edilir. Uzman ekibimiz kurulum ve kalibrasyon sürecini uçtan uca yönetir, öğretmen eğitimini verir.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Yapay Zeka Devreye Girer",
    description:
      "EYENA'nın AI motoru, öğrenci göz verilerini gerçek zamanlı işler. Dikkat kalıplarını tanır, anormallik tespiti yapar ve davranışları yorumlar.",
  },
  {
    number: "03",
    icon: FileBarChart,
    title: "Raporlar Otomatik Oluşur",
    description:
      "Öğretmen, öğrenci ve kurum yöneticisi panellerine özel ayrıntılı dikkat, odak ve katılım raporları otomatik olarak hazırlanır ve paylaşılır.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nasil-calisir" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      {/* subtle gradient stripe */}
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

        <div className="relative">
          {/* Horizontal connector — desktop */}
          <div className="hidden lg:flex absolute top-[52px] left-1/2 -translate-x-1/2 w-[55%] items-center pointer-events-none">
            <div className="flex-1 h-px bg-gradient-to-r from-[#5BC8F5]/0 via-[#5BC8F5]/35 to-[#5BC8F5]/0" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.18 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon badge */}
                <div className="relative mb-7">
                  <div className="w-[104px] h-[104px] rounded-3xl bg-[#5BC8F5]/8 border border-[#5BC8F5]/25 flex items-center justify-center neon-glow">
                    <step.icon className="text-[#5BC8F5]" size={38} strokeWidth={1.5} />
                  </div>
                  {/* Step number pill */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#5BC8F5] flex items-center justify-center shadow-[0_0_14px_rgba(91,200,245,0.6)]">
                    <span className="font-[Orbitron] text-[#0A0A0A] text-xs font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-white text-xl mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#bayi"
            className="px-8 py-4 bg-[#5BC8F5] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 shadow-[0_0_25px_rgba(91,200,245,0.4)] cursor-pointer"
          >
            Bayi Ol
          </a>
          <a
            href="#iletisim"
            className="px-8 py-4 border border-[#5BC8F5]/40 text-[#5BC8F5] font-medium rounded-xl hover:bg-[#5BC8F5]/10 transition-all duration-200 cursor-pointer"
          >
            Bize Ulaşın
          </a>
        </motion.div>
      </div>
    </section>
  );
}
