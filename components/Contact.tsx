"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, User, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#5BC8F5]/55 focus:bg-[#5BC8F5]/5 transition-all duration-200 text-sm";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const info = [
    { icon: Mail, label: "E-posta", value: "info@eyena.com.tr" },
    { icon: MapPin, label: "Adres", value: "İstanbul, Türkiye (Sanal Ofis)" },
    { icon: Clock, label: "Çalışma Saatleri", value: "Profesyonel ekibimize 7/24 ulaşabilirsiniz." },
  ];

  return (
    <section id="iletisim" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <Mail className="text-[#5BC8F5]" size={15} />
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">İletişim</span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Bizimle <span className="text-[#5BC8F5]">Kontak</span> Kurun
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Sorularınız, demo talepleriniz ve her türlü konuda uzman ekibimiz yanınızda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {info.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#5BC8F5]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-[#5BC8F5]" size={19} />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">{item.label}</div>
                  <div className="text-white font-medium text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-14">
                <div className="w-20 h-20 rounded-full bg-[#5BC8F5]/15 border border-[#5BC8F5]/35 flex items-center justify-center mx-auto mb-5 neon-glow">
                  <CheckCircle2 className="text-[#5BC8F5]" size={36} />
                </div>
                <h3 className="font-[Orbitron] text-xl font-bold text-white mb-3">
                  Mesajınız İletildi!
                </h3>
                <p className="text-gray-400 text-sm">En kısa sürede dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="c-name" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <User size={13} className="text-[#5BC8F5]" /> Ad Soyad
                  </label>
                  <input
                    id="c-name" type="text" required placeholder="Adınız ve soyadınız"
                    value={form.name} onChange={set("name")} className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-email" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Mail size={13} className="text-[#5BC8F5]" /> E-posta
                  </label>
                  <input
                    id="c-email" type="email" required placeholder="ornek@mail.com"
                    value={form.email} onChange={set("email")} className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-msg" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <MessageSquare size={13} className="text-[#5BC8F5]" /> Mesajınız
                  </label>
                  <textarea
                    id="c-msg" rows={5} required placeholder="Mesajınızı buraya yazın..."
                    value={form.message} onChange={set("message")}
                    className={inputClass + " resize-none"}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#5BC8F5] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 shadow-[0_0_28px_rgba(91,200,245,0.45)] cursor-pointer text-sm"
                >
                  <Send size={17} />
                  Mesaj Gönder
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
