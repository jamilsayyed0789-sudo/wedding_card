"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(invitationConfig.event.isoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section id="countdown" className="relative py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-8 sm:p-14 rounded-3xl bg-[#FDFBFE]/80 border border-[#9B51E0]/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(155, 81, 224,0.1)]"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          COUNTING DOWN TO FOREVER
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.15em] text-[#2D142C] font-light uppercase mb-8">
          UNTIL THE CELEBRATION
        </h3>

        {timeLeft.isPast ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-6 px-8 rounded-2xl border border-[#9B51E0] bg-gradient-to-r from-[#9B51E0]/20 via-[#D291FF]/20 to-[#9B51E0]/20"
          >
            <h4 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-purple-gradient font-medium uppercase">
              THE CELEBRATION HAS BEGUN
            </h4>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Days */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F9F6FA]/90 border border-[#9B51E0]/20 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-purple-gradient font-light leading-none mb-2">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#6B5B6B]/60 uppercase font-medium">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F9F6FA]/90 border border-[#9B51E0]/20 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-purple-gradient font-light leading-none mb-2">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#6B5B6B]/60 uppercase font-medium">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F9F6FA]/90 border border-[#9B51E0]/20 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-purple-gradient font-light leading-none mb-2">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#6B5B6B]/60 uppercase font-medium">
                MINUTES
              </span>
            </div>

            {/* Seconds */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F9F6FA]/90 border border-[#9B51E0]/20 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-purple-gradient font-light leading-none mb-2">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#6B5B6B]/60 uppercase font-medium">
                SECONDS
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
