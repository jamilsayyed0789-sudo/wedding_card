"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function VenueSection() {
  return (
    <section id="location" className="relative py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#9B51E0] font-medium mb-3">
          FIND YOUR WAY TO OUR CELEBRATION
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-purple-gradient font-light uppercase">
          CELEBRATION VENUE
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#9B51E0]/70 to-transparent mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#FDFBFE]/90 border border-[#9B51E0]/30 backdrop-blur-xl flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-14 h-14 rounded-full border border-[#9B51E0]/40 flex items-center justify-center mb-6 text-[#9B51E0] bg-[#F9F6FA] shadow-[0_0_20px_rgba(155, 81, 224,0.15)]">
              <MapPin className="w-6 h-6" />
            </div>

            <p className="text-xs tracking-[0.25em] text-[#9B51E0] uppercase font-medium mb-2">
              LOCATION DETAILS
            </p>

            <h3 className="font-serif text-3xl text-purple-gradient font-light uppercase mb-4 leading-tight">
              {invitationConfig.event.venue}
            </h3>

            <p className="text-sm text-[#6B5B6B]/80 leading-relaxed font-light mb-6">
              {invitationConfig.event.address}
            </p>

            <div className="w-full h-[1px] bg-[#9B51E0]/20 my-6" />

            <div className="space-y-2 text-xs text-[#6B5B6B]/70">
              <p>• Valet parking available at venue main gate</p>
              <p>• Reception doors open at 7:00 PM</p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={invitationConfig.event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#9B51E0] to-[#7A35B3] text-[#F9F6FA] font-medium text-xs tracking-[0.25em] uppercase shadow-[0_10px_25px_rgba(155, 81, 224,0.2)] flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#F9F6FA]" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-4 h-4 text-[#F9F6FA]" />
            </a>
          </div>
        </motion.div>

        {/* Map Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#9B51E0]/30 bg-[#FDFBFE] relative min-h-[350px] shadow-xl group"
        >
          {/* Stylized Google Maps Embed Iframe or Preview Map */}
          <iframe
            title="Venue Location Map"
            src="https://maps.google.com/maps?q=SAPTAPADI%20MANGAL%20KARYALAY%2C%20Katwan%20Khandoba%20Rd%2C%20Ahilyanagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%) brightness(85%)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[350px] object-cover"
          />

          {/* Map Overlay Header */}
          <div className="absolute top-4 left-4 py-2 px-4 rounded-full bg-[#F9F6FA]/90 border border-[#9B51E0]/40 text-xs tracking-widest text-[#4A1C40] backdrop-blur-md flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#9B51E0] animate-ping" />
            <span>AHMEDNAGAR, MAHARASHTRA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
