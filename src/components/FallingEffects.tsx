"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTICLE_COUNT = 60; // Fine particles

export default function FallingEffects() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {[...Array(PARTICLE_COUNT)].map((_, i) => {
        const startX = Math.random() * windowSize.width;
        const startY = -50 - Math.random() * windowSize.height;
        const duration = 12 + Math.random() * 15; // Slightly faster so it's noticeable
        
        // Size 3px to 8px so it's visible but elegant
        const size = 3 + Math.random() * 5; 
        
        const maxOpacity = 0.4 + Math.random() * 0.4; 
        
        const sway = 20 + Math.random() * 40;
        const swayDuration = 3 + Math.random() * 4;

        // Perfectly matching the website's purple theme
        const colors = [
          "rgba(155, 81, 224, 0.8)", // Deep theme purple
          "rgba(210, 145, 255, 0.8)", // Light theme lavender
          "rgba(122, 53, 179, 0.6)", // Dark theme purple
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
              x: startX,
              y: startY,
            }}
            animate={{
              y: [startY, windowSize.height + 100],
              x: [startX, startX - sway, startX + sway, startX],
              opacity: [0, maxOpacity, maxOpacity, 0],
            }}
            transition={{
              y: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: swayDuration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
              opacity: {
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          />
        );
      })}
    </div>
  );
}
