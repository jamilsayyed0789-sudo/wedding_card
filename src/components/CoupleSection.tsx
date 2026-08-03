"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function CoupleSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-[#9B51E0]/35 shadow-[0_25px_60px_rgba(0, 0, 0, 0.1)]">
        {/* Main Background Image Container */}
        <div className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={invitationConfig.media.coupleHero}
              alt={`${invitationConfig.groom.name} & ${invitationConfig.bride.name} Couple Portrait`}
              fill
              className="object-cover object-center filter contrast-105 brightness-90"
            />
          </motion.div>

          {/* Vignette Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6FA] via-[#F9F6FA]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9F6FA]/60 via-transparent to-[#F9F6FA]" />

          {/* Content Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-12 inset-x-6 sm:inset-x-12 text-center flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
              OUR CELEBRATION
            </p>

            <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-purple-gradient font-light leading-tight tracking-wide mb-4">
              "{invitationConfig.messages.coupleQuote}"
            </h3>

            <div className="w-24 h-[1px] bg-[#9B51E0]/60 my-2" />

            <p className="font-script text-2xl sm:text-3xl text-[#4A1C40] opacity-90 mt-2">
              {invitationConfig.groom.name} &amp; {invitationConfig.bride.name}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
