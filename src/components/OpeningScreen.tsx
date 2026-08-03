"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [step, setStep] = useState<"sealed" | "opening" | "card-out" | "transitioning">("sealed");

  const handleSealClick = () => {
    if (step !== "sealed") return;
    
    setStep("opening");
    
    // Step 2: Card slowly slides out
    setTimeout(() => {
      setStep("card-out");
    }, 1200); // Increased: Wait for flap to completely open

    // Step 3: Card expands to fill screen
    setTimeout(() => {
      setStep("transitioning");
    }, 3000); // Increased: Let them see the card fully out before scaling it

    // Step 4: Unmount and show website
    setTimeout(() => {
      onOpen();
    }, 4500); // Increased: Smoothly transition to main site
  };

  return (
    <motion.div
      key="envelope-screen"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#2D142C] perspective-[2000px]"
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Dynamic Background */}
      <Image
        src={invitationConfig.media.openingBg}
        alt="Background"
        fill
        className="object-cover opacity-20 blur-sm"
      />
      
      {/* The Envelope Wrapper */}
      <motion.div 
        className="relative w-[340px] h-[220px] sm:w-[460px] sm:h-[300px]"
        animate={step === "card-out" || step === "transitioning" ? { y: 150, opacity: step === "transitioning" ? 0 : 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        
        {/* Envelope Back (Inside) */}
        <div className="absolute inset-0 bg-[#F9F6FA] rounded-md shadow-inner overflow-hidden border border-[#D291FF]/20">
           {/* Subtle pattern for inside envelope */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9B51E0_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* The Invitation Card (Slides Up) */}
        <motion.div
          className="absolute inset-x-4 top-4 bottom-4 bg-white rounded shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-6 border border-[#E5D5F5] z-10"
          initial={{ y: 0 }}
          animate={
            step === "card-out" || step === "transitioning" 
              ? { y: -250, scale: step === "transitioning" ? 10 : 1 }
              : { y: 0 }
          }
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#9B51E0] text-xs tracking-widest uppercase mb-2">You're Invited</p>
          <h2 className="font-serif text-3xl text-purple-gradient text-center">
            {invitationConfig.groom.name} <br/>&<br/> {invitationConfig.bride.name}
          </h2>
        </motion.div>

        {/* Envelope Bottom Flaps (Front) */}
        <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-lg">
          {/* Left Flap */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FDFBFE] border-r border-[#D291FF]/30" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
          {/* Right Flap */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FDFBFE] border-l border-[#D291FF]/30" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
          {/* Bottom Flap */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#F9F6FA] border-t border-[#D291FF]/30 drop-shadow-md" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
        </div>

        {/* Envelope Top Flap (Opens) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[60%] bg-[#FDFBFE] origin-top z-30 drop-shadow-xl border-b border-[#D291FF]/40"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
          initial={{ rotateX: 0 }}
          animate={step !== "sealed" ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 1.2, ease: "circInOut" }}
        />

        {/* Wax Seal */}
        <AnimatePresence>
          {step === "sealed" && (
            <motion.button
              onClick={handleSealClick}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform bg-transparent"
            >
              <Image
                src="/images/mz_wax_seal_transparent.png"
                alt="M&Z Wax Seal"
                fill
                className="object-contain drop-shadow-2xl"
              />
              
              {/* Pulse effect to draw attention */}
              <div className="absolute inset-4 rounded-full border-2 border-[#D291FF] animate-ping opacity-30 pointer-events-none" />
            </motion.button>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
}
