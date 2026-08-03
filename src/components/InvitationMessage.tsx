"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function InvitationMessage() {
  return (
    <section className="relative py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-8 sm:p-14 rounded-2xl bg-[#FDFBFE]/60 border border-[#9B51E0]/25 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Subtle decorative gold corner frames */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#9B51E0]/50" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#9B51E0]/50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#9B51E0]/50" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#9B51E0]/50" />

        <Quote className="w-8 h-8 mx-auto text-[#9B51E0]/40 mb-6 rotate-180" />

        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2D142C] font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
          "{invitationConfig.messages.inviteText}"
        </p>

        <div className="w-16 h-[1px] bg-[#9B51E0]/50 mx-auto my-6" />

        <div className="space-y-1">
          <p className="text-xs tracking-[0.25em] text-[#9B51E0] uppercase font-medium">
            {invitationConfig.groom.parents}
          </p>
          <p className="text-xs tracking-[0.25em] text-[#9B51E0] uppercase font-medium">
            {invitationConfig.bride.parents}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
