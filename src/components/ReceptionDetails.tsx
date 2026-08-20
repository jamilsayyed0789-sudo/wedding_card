"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function ReceptionDetails() {
  const scrollToLocation = () => {
    const loc = document.getElementById("location");
    if (loc) {
      loc.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="details" className="relative py-24 px-6 max-w-5xl mx-auto text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#9B51E0]/5 blur-[90px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          EVENT CELEBRATION
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-purple-gradient font-light uppercase mb-12">
          {invitationConfig.event.title}
        </h2>

        {/* Elegant Grid for Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">

          {/* Card 2: Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-[#FDFBFE]/80 border border-[#9B51E0]/25 backdrop-blur-md flex flex-col items-center justify-between hover:border-[#9B51E0]/50 transition-colors group shadow-lg"
          >
            <div className="w-12 h-12 rounded-full border border-[#9B51E0]/40 flex items-center justify-center mb-6 text-[#9B51E0] group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.25em] text-[#6B5B6B]/60 uppercase font-medium mb-1">
                TIMING
              </p>
              <h3 className="font-serif text-2xl text-purple-gradient font-light uppercase">
                {invitationConfig.event.time}
              </h3>
              <p className="text-sm tracking-wider text-[#6B5B6B]/70 mt-3 font-medium">
                Afternoon Lunch &amp; Celebrations
              </p>
            </div>
          </motion.div>

          {/* Card 3: Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-[#FDFBFE]/80 border border-[#9B51E0]/25 backdrop-blur-md flex flex-col items-center justify-between hover:border-[#9B51E0]/50 transition-colors group shadow-lg"
          >
            <div className="w-12 h-12 rounded-full border border-[#9B51E0]/40 flex items-center justify-center mb-6 text-[#9B51E0] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.25em] text-[#6B5B6B]/60 uppercase font-medium mb-1">
                VENUE
              </p>
              <h3 className="font-serif text-2xl text-purple-gradient font-light uppercase">
                {invitationConfig.event.venue}
              </h3>
              <p className="text-sm tracking-wider text-[#4A1C40] mt-1 font-medium">
                {invitationConfig.event.address}
              </p>
              <p className="text-xs tracking-wider text-[#6B5B6B]/70 mt-1">
                {invitationConfig.event.city}
              </p>
            </div>
          </motion.div>
        </div>

        {/* View Location CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <button
            onClick={scrollToLocation}
            className="group inline-flex items-center gap-3 py-3.5 px-8 rounded-full border border-[#9B51E0]/40 bg-[#FDFBFE]/80 text-[#9B51E0] hover:bg-[#9B51E0] hover:text-[#F9F6FA] transition-all duration-300 text-xs tracking-[0.25em] font-medium uppercase shadow-[0_0_20px_rgba(155, 81, 224,0.1)] cursor-pointer"
          >
            <Navigation className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span>VIEW LOCATION</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
