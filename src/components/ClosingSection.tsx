"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function ClosingSection() {
  return (
    <section className="relative min-h-[75vh] flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden border-t border-[#9B51E0]/20">
      {/* Dark palace background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={invitationConfig.media.closingBg}
          alt="Luxury Heritage Palace Night"
          fill
          className="object-cover object-center opacity-30 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6FA] via-[#F9F6FA]/80 to-[#F9F6FA]/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full border border-[#9B51E0]/40 flex items-center justify-center mb-6 text-[#9B51E0] bg-[#FDFBFE]/60 backdrop-blur-md shadow-[0_0_20px_rgba(155, 81, 224,0.15)]">
          <Heart className="w-5 h-5 text-[#9B51E0]" />
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          {invitationConfig.messages.closingTitle}
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D142C] font-light leading-relaxed tracking-wide mb-6">
          "{invitationConfig.messages.closingMessage}"
        </h2>

        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#9B51E0]/80 to-transparent my-6" />

        <p className="font-script text-2xl text-[#4A1C40] mb-2 font-normal">
          {invitationConfig.messages.closingWithLove}
        </p>

        <h3 className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-purple-gradient font-light uppercase">
          {invitationConfig.groom.name} &amp; {invitationConfig.bride.name}
        </h3>

        <p className="text-[11px] tracking-[0.3em] text-[#6B5B6B]/40 uppercase mt-12">
          © 2026 {invitationConfig.groom.name} &amp; {invitationConfig.bride.name} • All Rights Reserved
        </p>
      </motion.div>
    </section>
  );
}
