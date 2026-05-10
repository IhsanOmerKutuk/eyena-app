"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  { name: "Google",                url: "https://logo.clearbit.com/google.com" },
  { name: "University of Cambridge", url: "https://logo.clearbit.com/cam.ac.uk" },
  { name: "P&G",                   url: "https://logo.clearbit.com/pg.com" },
  { name: "Toyota",                url: "https://logo.clearbit.com/toyota.com" },
  { name: "Harvard University",    url: "https://logo.clearbit.com/harvard.edu" },
  { name: "Meta",                  url: "https://logo.clearbit.com/meta.com" },
  { name: "Unilever",              url: "https://logo.clearbit.com/unilever.com" },
];

export default function Partnership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ortaklik" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5BC8F5]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">Güven & Ortaklık</span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Dünya Standardı <span className="text-[#5BC8F5]">Teknoloji</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            İsveçli Tobii&apos;nin 20 yıllık göz takibi uzmanlığı ile Türk eğitim sisteminin
            bilgisini tek çatı altında birleştiriyoruz.
          </p>
        </motion.div>

        {/* Tobii logo block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex flex-col items-center mb-16"
        >
          <img
            src="https://www.tobii.com/siteassets/images/logos/tobii-logo-black.svg"
            alt="Tobii"
            style={{ height: 72, filter: "brightness(0) invert(1)" }}
            className="object-contain"
          />
          <div className="mt-6 inline-flex items-center gap-2 glass-light rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-[#5BC8F5] shadow-[0_0_8px_rgba(91,200,245,0.9)]" />
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">
              Resmi Teknoloji Ortağı
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="border-t border-white/10 mb-12"
        />

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p className="text-gray-500 text-xs text-center mb-10 tracking-[0.22em] uppercase">
            Tobii Technology — Dünya Markası
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {clients.map((c, i) => (
              <motion.img
                key={c.name}
                src={c.url}
                alt={c.name}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                style={{ height: 40 }}
                className="object-contain grayscale opacity-35 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#bayi"
            className="px-8 py-4 bg-[#5BC8F5] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 shadow-[0_0_25px_rgba(91,200,245,0.4)] cursor-pointer"
          >
            Çözüm Ortaklığı
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
