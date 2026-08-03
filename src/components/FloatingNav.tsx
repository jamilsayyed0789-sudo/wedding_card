"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Image as ImageIcon, MapPin, Send, Menu, X } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

const navItems = [
  { id: "hero", label: "STORY", icon: Heart },
  { id: "details", label: "EVENT", icon: Calendar },
  { id: "gallery", label: "GALLERY", icon: ImageIcon },
  { id: "location", label: "LOCATION", icon: MapPin },
  { id: "rsvp", label: "RSVP", icon: Send },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec) => {
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: scrolled ? 1 : 0.8, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto relative bg-[#FDFBFE]/80 backdrop-blur-xl border border-[#9B51E0]/30 rounded-full py-2 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_15px_rgba(155, 81, 224,0.1)] flex items-center justify-between gap-6 sm:gap-8">
        {/* Monogram branding */}
        <button
          onClick={() => scrollToSection("hero")}
          className="font-serif text-lg font-medium text-purple-gradient tracking-widest px-2 cursor-pointer"
        >
          {invitationConfig.groom.name[0]} &amp; {invitationConfig.bride.name[0]}
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#F9F6FA] font-semibold"
                    : "text-[#6B5B6B]/80 hover:text-[#4A1C40]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#9B51E0] to-[#D291FF] rounded-full -z-10 shadow-[0_0_12px_rgba(155, 81, 224,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-[#9B51E0] cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 inset-x-6 bg-[#FDFBFE]/95 backdrop-blur-2xl border border-[#9B51E0]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0, 0, 0, 0.15)] flex flex-col gap-2 md:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs tracking-[0.2em] font-medium transition-all ${
                    isActive
                      ? "bg-[#9B51E0]/20 text-[#9B51E0] border border-[#9B51E0]/40"
                      : "text-[#6B5B6B]/80 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#9B51E0]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
