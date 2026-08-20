"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { Sparkles } from "lucide-react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Auto-reveal when scrolled into view
  useEffect(() => {
    if (isInView && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 1500); // 1.5 second delay before it magically reveals itself
      return () => clearTimeout(timer);
    }
  }, [isInView, isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set actual canvas resolution for sharpness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw the "foil" overlay (Metallic Purple/Silver)
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#D291FF");
    gradient.addColorStop(0.5, "#9B51E0");
    gradient.addColorStop(1, "#7A35B3");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add noise/texture to make it look like a scratch card
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
      ctx.fillRect(
        Math.random() * rect.width,
        Math.random() * rect.height,
        2,
        2
      );
    }

    // Add "SCRATCH HERE" text on the foil
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH HERE", rect.width / 2, rect.height / 2);

    // Now set composite operation to erase
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 40; // Brush size
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    // Prevent scrolling while scratching
    if ("touches" in e && e.cancelable) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Check scratched percentage occasionally
    if (Math.random() > 0.8) {
      checkPercentage(ctx, canvas);
    }
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopScratch = () => {
    setIsDrawing(false);
  };

  const checkPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    // Check every 4th pixel (alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const totalPixels = pixels.length / 4;
    const percentage = (transparentPixels / totalPixels) * 100;

    // Auto-reveal if more than 40% scratched
    if (percentage > 40) {
      setIsRevealed(true);
    }
  };

  return (
    <section ref={containerRef} className="relative py-12 px-6 max-w-lg mx-auto text-center flex flex-col items-center">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-2">
          SAVE THE DATE
        </p>
        <h3 className="font-serif text-2xl tracking-[0.1em] text-purple-gradient font-light uppercase">
          MARK YOUR CALENDAR
        </h3>
      </div>

      {/* The Scratch Card Area */}
      <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(155,81,224,0.15)] border border-[#9B51E0]/30 bg-[#FDFBFE] flex items-center justify-center select-none touch-none">
        
        {/* Hidden Content (Revealed when scratched) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBFE] to-[#F9F6FA] p-6 z-0">
          <Sparkles className="w-6 h-6 text-[#9B51E0] mb-2 animate-pulse" />
          <p className="font-serif text-3xl md:text-4xl text-purple-gradient font-medium mb-1">
            {invitationConfig.messages.openingDate}
          </p>
          <p className="text-[10px] tracking-[0.2em] text-[#6B5B6B] uppercase font-semibold">
            {invitationConfig.event.day} • {invitationConfig.event.time}
          </p>
        </div>

        {/* Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, transition: { duration: 1, ease: "easeOut" } }}
              onMouseDown={startScratch}
              onMouseMove={scratch}
              onMouseUp={stopScratch}
              onMouseLeave={stopScratch}
              onTouchStart={startScratch}
              onTouchMove={scratch}
              onTouchEnd={stopScratch}
              onTouchCancel={stopScratch}
              className="absolute inset-0 w-full h-full z-10 cursor-pointer"
              style={{ touchAction: "none" }}
            />
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isRevealed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm text-[#9B51E0] font-medium tracking-wide"
          >
            Looking forward to seeing you!
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
