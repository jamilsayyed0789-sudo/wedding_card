"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { invitationConfig } from "@/config/invitation";

export default function RSVPSection() {
  const handleRSVP = () => {
    // Fire champagne gold confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#9B51E0", "#D291FF", "#7A35B3", "#FDFBFE"],
    });

    const text = encodeURIComponent(
      `Hello ${invitationConfig.groom.name} & ${invitationConfig.bride.name}, I would love to attend your reception. Looking forward to celebrating with you!`
    );
    const waUrl = `https://wa.me/${invitationConfig.event.whatsappNumber}?text=${text}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="rsvp" className="relative py-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-8 sm:p-16 rounded-3xl bg-[#FDFBFE]/85 border border-[#9B51E0]/35 backdrop-blur-xl shadow-[0_20px_50px_rgba(0, 0, 0, 0.1),0_0_30px_rgba(155, 81, 224,0.12)] flex flex-col items-center"
      >
        <div className="w-14 h-14 rounded-full border border-[#9B51E0]/40 flex items-center justify-center mb-6 text-[#9B51E0] bg-[#F9F6FA] shadow-[0_0_20px_rgba(155, 81, 224,0.15)]">
          <Heart className="w-6 h-6 fill-[#9B51E0]/20 text-[#9B51E0]" />
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          PLEASE CONFIRM YOUR PRESENCE
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] text-purple-gradient font-light uppercase max-w-2xl leading-tight mb-4">
          {invitationConfig.messages.rsvpTitle}
        </h2>

        <p className="text-sm sm:text-base text-[#6B5B6B]/80 font-light max-w-md mb-10 leading-relaxed">
          {invitationConfig.messages.rsvpSubtitle}
        </p>

        {/* WhatsApp RSVP Button */}
        <motion.button
          onClick={handleRSVP}
          whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(155, 81, 224,0.4)" }}
          whileTap={{ scale: 0.96 }}
          className="group relative py-4 px-10 rounded-full bg-gradient-to-r from-[#9B51E0] via-[#D291FF] to-[#7A35B3] text-[#F9F6FA] font-medium text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_10px_30px_rgba(155, 81, 224,0.25)] flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
        >
          <MessageSquare className="w-5 h-5 text-[#F9F6FA]" />
          <span>RSVP ON WHATSAPP</span>
        </motion.button>

        <p className="text-[11px] tracking-widest text-[#6B5B6B]/50 uppercase mt-6">
          Opens instant WhatsApp message to couple
        </p>
      </motion.div>
    </section>
  );
}
