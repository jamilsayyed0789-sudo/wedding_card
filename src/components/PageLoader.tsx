"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { invitationConfig } from "@/config/invitation";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"initial" | "names">("initial");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep("names");
    }, 700);

    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9F6FA] text-[#2D142C] overflow-hidden"
        >
          {/* Subtle gold glow behind monogram */}
          <div className="absolute w-72 h-72 rounded-full bg-[#9B51E0]/15 blur-[90px] pointer-events-none" />

          {/* Floating Background Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${20 + (i * 12) % 60}vw`,
                  y: `${80 + (i * 7) % 40}vh`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: `${20 + (i * 15) % 60}vh`,
                  opacity: [0, 0.5, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute w-1 h-1 rounded-full bg-[#9B51E0] shadow-[0_0_8px_#9B51E0]"
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Monogram Seal with Animated Rings */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="absolute -inset-4 border border-dashed border-[#9B51E0]/30 rounded-full opacity-60"
              />
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="relative w-20 h-20 rounded-full border border-[#9B51E0]/50 flex items-center justify-center bg-[#FDFBFE]/80 shadow-[0_0_30px_rgba(155, 81, 224,0.2)]"
              >
                <span className="font-serif text-3xl text-purple-gradient font-light">
                  {invitationConfig.groom.name[0]} &amp; {invitationConfig.bride.name[0]}
                </span>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {step === "initial" ? (
                <motion.p
                  key="monogram"
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                  className="tracking-[0.4em] text-xs sm:text-sm text-[#9B51E0] uppercase font-light"
                >
                  RECEPTION INVITATION
                </motion.p>
              ) : (
                <motion.h1
                  key="fullname"
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] text-purple-gradient uppercase font-light"
                >
                  {invitationConfig.groom.name} &amp; {invitationConfig.bride.name}
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Glowing Loading Bar */}
            <div className="w-48 h-[2px] bg-[#9B51E0]/10 mt-10 relative overflow-hidden rounded-full shadow-[0_0_10px_rgba(155, 81, 224,0.2)]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9B51E0] to-transparent w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
