"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Özellikler", href: "#ozellikler" },
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "Hedef Kitle", href: "#hedef-kitle" },
  { label: "Ortaklık", href: "#ortaklik" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        scrolled ? "glass neon-glow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0.5 select-none">
          <span className="font-[Orbitron] text-2xl font-bold tracking-widest text-[#5BC8F5]">EYE</span>
          <span className="font-[Orbitron] text-2xl font-bold tracking-widest text-white">NA</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-[#5BC8F5] text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#iletisim"
            className="px-5 py-2 text-sm font-medium text-[#5BC8F5] border border-[#5BC8F5]/40 rounded-xl hover:bg-[#5BC8F5]/10 transition-all duration-200 cursor-pointer"
          >
            Bize Ulaşın
          </a>
          <a
            href="#bayi"
            className="px-5 py-2 text-sm font-semibold text-[#0A0A0A] bg-[#5BC8F5] rounded-xl hover:bg-[#5BC8F5]/85 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(91,200,245,0.45)]"
          >
            Bayi Ol
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Menüyü aç"
          className="md:hidden text-white p-2 cursor-pointer"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden rounded-b-2xl glass"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-[#5BC8F5] transition-colors duration-200 py-1 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                <a
                  href="#iletisim"
                  className="py-3 text-center text-[#5BC8F5] border border-[#5BC8F5]/40 rounded-xl hover:bg-[#5BC8F5]/10 transition-all duration-200 cursor-pointer text-sm font-medium"
                >
                  Bize Ulaşın
                </a>
                <a
                  href="#bayi"
                  className="py-3 text-center text-[#0A0A0A] bg-[#5BC8F5] rounded-xl font-semibold cursor-pointer text-sm"
                >
                  Bayi Ol
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
