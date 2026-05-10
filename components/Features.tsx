"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Brain, Monitor, BarChart3, GraduationCap, BellRing } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Gerçek Zamanlı Göz Takibi",
    description:
      "Tobii teknolojisi ile 60 FPS hızında öğrencinin bakış noktasını, göz hareketlerini ve dikkat yoğunluğunu milisaniye hassasiyetle tespit eder.",
    wide: true,
  },
  {
    icon: Brain,
    title: "Yapay Zeka Analizi",
    description:
      "Öğrenci davranışlarını analiz eden AI modeli, dikkat dağınıklığını ve odaklanma süreçlerini otomatik raporlar.",
    wide: false,
  },
  {
    icon: Monitor,
    title: "Tobii Entegrasyonu",
    description:
      "İsveçli Tobii'nin endüstri standardı donanımıyla sorunsuz, sıfır gecikme entegrasyonu.",
    wide: false,
  },
  {
    icon: BarChart3,
    title: "Kurumsal Raporlama Paneli",
    description:
      "Okul müdürleri ve kurum yöneticileri için kapsamlı analitik dashboard ile tüm sınıfların anlık durumu.",
    wide: false,
  },
  {
    icon: GraduationCap,
    title: "MEB Uyumlu Sistem",
    description:
      "Türk Milli Eğitim Bakanlığı müfredatına ve standartlarına tam uyumlu altyapı ile raporlama formatı.",
    wide: false,
  },
  {
    icon: BellRing,
    title: "Anlık Dikkat Uyarıları",
    description:
      "Öğrenci dikkat düşüşlerinde öğretmene anlık bildirim gönderir, müdahale fırsatı yaratır.",
    wide: false,
  },
];

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
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">Temel Özellikler</span>
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
              className={`glass rounded-2xl p-7 cursor-pointer group transition-all duration-300 hover:border-[#5BC8F5]/40 hover:shadow-[0_0_28px_rgba(91,200,245,0.12)] ${
                f.wide ? "lg:col-span-2" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#5BC8F5]/10 flex items-center justify-center mb-5 group-hover:bg-[#5BC8F5]/20 transition-colors duration-200">
                <f.icon className="text-[#5BC8F5]" size={22} />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
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
