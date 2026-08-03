"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden">
      {/* Subtle ambient gold glowing aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#9B51E0]/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Family Blessings Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#9B51E0]" />
          <p className="font-script text-xl sm:text-2xl text-[#4A1C40] tracking-wide font-normal">
            {invitationConfig.messages.blessingText}
          </p>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#9B51E0]" />
        </motion.div>

        {/* Monogram Seal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-16 rounded-full border border-[#9B51E0]/40 flex items-center justify-center my-4 bg-[#FDFBFE]/60 backdrop-blur-md shadow-[0_0_25px_rgba(155, 81, 224,0.15)]"
        >
          <Sparkles className="w-6 h-6 text-[#9B51E0]" />
        </motion.div>

        {/* Main Names Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="my-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-purple-gradient font-light uppercase leading-none">
            {invitationConfig.groom.name}
          </h1>
          <p className="font-script text-4xl sm:text-6xl text-[#4A1C40] my-2 font-normal">
            &amp;
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-purple-gradient font-light uppercase leading-none">
            {invitationConfig.bride.name}
          </h1>
        </motion.div>

        {/* Gold Ornament Line */}
        <div className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#9B51E0]/80 to-transparent my-8" />

        {/* Subtitle Invitation Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs sm:text-sm tracking-[0.35em] text-[#6B5B6B]/90 uppercase font-medium max-w-lg leading-relaxed"
        >
          {invitationConfig.event.tagline}
        </motion.p>
      </motion.div>
    </section>
  );
}
