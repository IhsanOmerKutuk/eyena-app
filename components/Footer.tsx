import { Camera, Briefcase, AtSign, Rss } from "lucide-react";

const footerLinks = [
  { label: "Özellikler", href: "#ozellikler" },
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "Hedef Kitle", href: "#hedef-kitle" },
  { label: "Ortaklık", href: "#ortaklik" },
  { label: "Bayi Ol", href: "#bayi" },
  { label: "İletişim", href: "#iletisim" },
];

const socials = [
  { Icon: Camera, label: "Instagram", href: "#" },
  { Icon: Briefcase, label: "LinkedIn", href: "#" },
  { Icon: AtSign, label: "Twitter / X", href: "#" },
  { Icon: Rss, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 pt-14 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-0.5 mb-4 select-none">
              <span className="font-[Orbitron] text-2xl font-bold tracking-widest text-[#5BC8F5]">EYE</span>
              <span className="font-[Orbitron] text-2xl font-bold tracking-widest text-white">NA</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Göz takibi teknolojisi ve yapay zeka ile eğitimde dikkat ve odak
              analizinin öncüsü.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              TEMELMAT EĞİTİM BİLİŞİM ARGE YAZILIM VE YAYINCILIK LTD. ŞTİ.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Hızlı Bağlantılar</h4>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-400 hover:text-[#5BC8F5] transition-colors duration-200 text-sm cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">İletişim</h4>
            <div className="space-y-2.5 text-sm text-gray-400 mb-7">
              <div>info@eyena.com.tr</div>
              <div>+90 (212) XXX XX XX</div>
              <div>İstanbul, Türkiye</div>
            </div>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#5BC8F5] hover:border-[#5BC8F5]/35 transition-all duration-200 cursor-pointer"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 EYENA. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-600">
            <span className="text-[#5BC8F5] font-[Orbitron] font-semibold tracking-wider">
              Tracking Insights
            </span>
            <span>•</span>
            <a href="#" className="hover:text-[#5BC8F5] transition-colors cursor-pointer">
              Gizlilik Politikası
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#5BC8F5] transition-colors cursor-pointer">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
