"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Award, Globe2, CheckCircle2 } from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "MEB Uyumlu" },
  { icon: Award, label: "Tobii Ortağı" },
  { icon: Globe2, label: "Türkiye Geneli" },
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
            İsveçli Tobii'nin 20 yıllık göz takibi uzmanlığı ile Türk eğitim sisteminin
            bilgisini tek çatı altında birleştiriyoruz.
          </p>
        </motion.div>

        {/* Partner cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Tobii */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-[#5BC8F5]/18 hover:border-[#5BC8F5]/40 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5BC8F5]/10 border border-[#5BC8F5]/30 flex items-center justify-center neon-glow">
                <span className="font-[Orbitron] text-[#5BC8F5] font-bold text-2xl">T</span>
              </div>
              <div>
                <div className="font-[Orbitron] text-white font-bold text-xl">Tobii</div>
                <div className="text-gray-400 text-sm">İsveç — Göz Takibi Lideri</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Tobii, göz takibi teknolojisinin küresel öncüsüdür. 20 yılı aşkın Ar-Ge
              deneyimiyle geliştirilen donanım ve yazılım altyapısı EYENA'nın temelini oluşturur.
            </p>
            <div className="space-y-2.5">
              {[
                "20+ yıl göz takibi araştırması",
                "60'tan fazla ülkede kullanım",
                "Tıp, savunma ve eğitimde küresel referanslar",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="text-[#5BC8F5] flex-shrink-0" size={15} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TEMELMAT */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-[#5BC8F5]/18 hover:border-[#5BC8F5]/40 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5BC8F5]/10 border border-[#5BC8F5]/30 flex items-center justify-center neon-glow">
                <span className="font-[Orbitron] text-[#5BC8F5] font-bold text-2xl">M</span>
              </div>
              <div>
                <div className="font-[Orbitron] text-white font-bold text-xl">TEMELMAT</div>
                <div className="text-gray-400 text-sm">Türkiye — Eğitim Teknolojileri</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              TEMELMAT EĞİTİM BİLİŞİM ARGE YAZILIM VE YAYINCILIK LTD. ŞTİ., Türkiye'de
              eğitim teknolojileri alanında uzun yıllara dayanan kurumsal deneyimiyle faaliyet göstermektedir.
            </p>
            <div className="space-y-2.5">
              {[
                "MEB onaylı çözümler ve içerikler",
                "Türk eğitim sistemine özel adaptasyon",
                "Türkiye genelinde büyüyen bayi ağı",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="text-[#5BC8F5] flex-shrink-0" size={15} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {trustBadges.map((b, i) => (
            <div
              key={i}
              className="glass-light rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <b.icon className="text-[#5BC8F5]" size={20} />
              <span className="text-white font-medium text-sm">{b.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
