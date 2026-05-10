"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, User, Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const cities = [
  "İstanbul","Ankara","İzmir","Bursa","Antalya","Adana","Konya","Gaziantep",
  "Şanlıurfa","Kocaeli","Mersin","Diyarbakır","Hatay","Manisa","Kayseri",
  "Samsun","Balıkesir","Kahramanmaraş","Trabzon","Malatya","Denizli",
  "Erzurum","Muğla","Ordu","Van","Sakarya","Eskişehir","Tekirdağ","Diğer",
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#5BC8F5]/55 focus:bg-[#5BC8F5]/5 transition-all duration-200 text-sm";

export default function DealerForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", institution: "", city: "", message: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="bayi" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5BC8F5]/5 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-4">
            <Building2 className="text-[#5BC8F5]" size={15} />
            <span className="text-[#5BC8F5] text-sm font-medium tracking-wide">Çözüm Ortaklığı Başvurusu</span>
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white mb-4">
            Çözüm Ortaklığına <span className="text-[#5BC8F5]">Katılın</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Türkiye genelinde EYENA çözüm ortağı olmak için başvurun. Uzman ekibimiz en
            kısa sürede sizinle iletişime geçecektir.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          {submitted ? (
            <div className="text-center py-14">
              <div className="w-20 h-20 rounded-full bg-[#5BC8F5]/15 border border-[#5BC8F5]/35 flex items-center justify-center mx-auto mb-5 neon-glow">
                <CheckCircle2 className="text-[#5BC8F5]" size={36} />
              </div>
              <h3 className="font-[Orbitron] text-2xl font-bold text-white mb-3">
                Başvurunuz Alındı!
              </h3>
              <p className="text-gray-400">
                Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="d-name" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <User size={13} className="text-[#5BC8F5]" /> Ad Soyad
                  </label>
                  <input
                    id="d-name" type="text" required placeholder="Adınız ve soyadınız"
                    value={form.name} onChange={set("name")} className={inputClass}
                  />
                </div>
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="d-phone" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Phone size={13} className="text-[#5BC8F5]" /> Telefon
                  </label>
                  <input
                    id="d-phone" type="tel" required placeholder="0(5XX) XXX XX XX"
                    value={form.phone} onChange={set("phone")} className={inputClass}
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="d-email" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Mail size={13} className="text-[#5BC8F5]" /> E-posta
                  </label>
                  <input
                    id="d-email" type="email" required placeholder="ornek@mail.com"
                    value={form.email} onChange={set("email")} className={inputClass}
                  />
                </div>
                {/* Institution */}
                <div className="space-y-1.5">
                  <label htmlFor="d-inst" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Building2 size={13} className="text-[#5BC8F5]" /> Kurum Adı
                  </label>
                  <input
                    id="d-inst" type="text" required placeholder="Kurumunuzun adı"
                    value={form.institution} onChange={set("institution")} className={inputClass}
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="d-city" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                  <MapPin size={13} className="text-[#5BC8F5]" /> Şehir
                </label>
                <select
                  id="d-city" required value={form.city} onChange={set("city")}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5BC8F5]/55 transition-all duration-200 cursor-pointer text-sm"
                >
                  <option value="">Şehir seçin</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="d-msg" className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                  <MessageSquare size={13} className="text-[#5BC8F5]" /> Mesajınız (isteğe bağlı)
                </label>
                <textarea
                  id="d-msg" rows={4}
                  placeholder="Çözüm ortağı olmak istediğiniz bölge, kurumunuz hakkında kısa bilgi..."
                  value={form.message} onChange={set("message")}
                  className={inputClass + " resize-none"}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#5BC8F5] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 shadow-[0_0_28px_rgba(91,200,245,0.45)] cursor-pointer text-sm"
              >
                <Send size={17} />
                Başvuruyu Gönder
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
