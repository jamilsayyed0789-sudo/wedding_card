"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function PhotoGallery() {
  const gallery = invitationConfig.media.gallery;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLightboxOpen, gallery.length]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, showNext, showPrev]);

  return (
    <section id="gallery" className="relative py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          MEMORIES IN THE MAKING
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-purple-gradient font-light uppercase">
          PHOTO GALLERY
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#9B51E0]/70 to-transparent mx-auto mt-6" />
      </div>

      {/* Main Slideshow Container */}
      <div 
        className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#FDFBFE] border border-[#9B51E0]/25 shadow-2xl group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 cursor-pointer"
            onClick={openLightbox}
          >
            <Image
              src={gallery[currentIndex].src}
              alt={gallery[currentIndex].alt}
              fill
              className="object-cover object-center filter contrast-105"
              priority
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/80 via-transparent to-transparent opacity-70" />
            
            {/* Caption */}
            <div className="absolute inset-x-6 bottom-8 md:bottom-12 flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-2xl md:text-3xl text-[#FDFBFE] font-light tracking-wide mb-2 drop-shadow-md"
                >
                  {gallery[currentIndex].caption}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs tracking-[0.25em] text-[#D291FF] uppercase font-medium drop-shadow-md"
                >
                  {gallery[currentIndex].alt}
                </motion.p>
              </div>
              
              <div className="hidden md:flex w-10 h-10 rounded-full bg-[#FDFBFE]/20 backdrop-blur-md border border-[#FDFBFE]/40 items-center justify-center text-[#FDFBFE] opacity-0 group-hover:opacity-100 transition-opacity mt-4 md:mt-0">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); showPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FDFBFE]/30 backdrop-blur-md border border-[#FDFBFE]/40 text-[#FDFBFE] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-[#9B51E0]/60 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); showNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FDFBFE]/30 backdrop-blur-md border border-[#FDFBFE]/40 text-[#FDFBFE] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-[#9B51E0]/60 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FDFBFE]/30 backdrop-blur-md border border-[#FDFBFE]/40 text-[#FDFBFE] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#FDFBFE]/50 z-10"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Thumbnail Navigation Indicators */}
      <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
        {gallery.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx 
                ? "w-8 h-2 bg-[#9B51E0]" 
                : "w-2 h-2 bg-[#9B51E0]/30 hover:bg-[#9B51E0]/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#F9F6FA]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="w-full max-w-5xl flex items-center justify-between z-10 py-2">
              <span className="text-xs tracking-[0.25em] text-[#9B51E0] uppercase font-medium">
                {currentIndex + 1} / {gallery.length}
              </span>

              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-[#FDFBFE] border border-[#9B51E0]/40 text-[#9B51E0] hover:bg-[#9B51E0] hover:text-[#F9F6FA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image View */}
            <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center my-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={gallery[currentIndex].src}
                    alt={gallery[currentIndex].alt}
                    fill
                    className="object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={showPrev}
                className="absolute left-2 sm:-left-6 p-3 rounded-full bg-[#FDFBFE]/80 border border-[#9B51E0]/40 text-[#9B51E0] hover:scale-110 transition-transform cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={showNext}
                className="absolute right-2 sm:-right-6 p-3 rounded-full bg-[#FDFBFE]/80 border border-[#9B51E0]/40 text-[#9B51E0] hover:scale-110 transition-transform cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="text-center py-4 max-w-md z-10">
              <p className="font-serif text-xl text-purple-gradient font-light">
                {gallery[currentIndex].caption}
              </p>
              <p className="text-[11px] tracking-[0.2em] text-[#6B5B6B]/60 uppercase mt-2">
                {invitationConfig.groom.name} &amp; {invitationConfig.bride.name} Reception
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
