"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "./PageLoader";
import OpeningScreen from "./OpeningScreen";
import FloatingNav from "./FloatingNav";
import MusicControl from "./MusicControl";
import HeroSection from "./HeroSection";
import InvitationMessage from "./InvitationMessage";
import ReceptionDetails from "./ReceptionDetails";
import CountdownTimer from "./CountdownTimer";
import CoupleSection from "./CoupleSection";
import PhotoGallery from "./PhotoGallery";
import VenueSection from "./VenueSection";
import ShareButton from "./ShareButton";
import ClosingSection from "./ClosingSection";
import ScratchCard from "./ScratchCard";
import FallingEffects from "./FallingEffects";

export default function InvitationReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoMusic, setAutoMusic] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setAutoMusic(true);
  };

  return (
    <>
      {/* 1. Initial Page Loading Animation */}
      <PageLoader />

      {/* 2. Full-screen Opening Cover */}
      <AnimatePresence mode="wait">
        {!isOpen && <OpeningScreen onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      {/* 3. Revealed Main Digital Invitation Website */}
      {isOpen && (
        <motion.main
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen bg-[#F9F6FA] text-[#2D142C] selection:bg-[#9B51E0] selection:text-[#F9F6FA]"
        >
          {/* Global Background Effects */}
          <FallingEffects />
          
          {/* Persistent Floating Controls */}
          <FloatingNav />
          <MusicControl autoStart={autoMusic} />

          {/* Invitation Content Flow */}
          <div className="relative z-10">
            <HeroSection />
            <InvitationMessage />
            <ReceptionDetails />
            <ScratchCard />
            <CountdownTimer />
            <CoupleSection />
            <PhotoGallery />
            <VenueSection />
            <ShareButton />
            <ClosingSection />
          </div>
        </motion.main>
      )}
    </>
  );
}
