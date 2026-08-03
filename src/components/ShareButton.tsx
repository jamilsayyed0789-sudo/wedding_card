"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Copy } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${invitationConfig.groom.name} & ${invitationConfig.bride.name} — Reception Invitation`,
      text: `You're warmly invited to celebrate the reception of ${invitationConfig.groom.name} & ${invitationConfig.bride.name}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed, fallback to copy
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="py-8 text-center flex flex-col items-center">
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group inline-flex items-center gap-3 py-3 px-8 rounded-full border border-[#9B51E0]/40 bg-[#FDFBFE]/80 text-[#9B51E0] hover:bg-[#9B51E0] hover:text-[#F9F6FA] transition-all duration-300 text-xs tracking-[0.25em] font-medium uppercase shadow-[0_0_20px_rgba(155, 81, 224,0.1)] cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        <span>{copied ? "LINK COPIED!" : "SHARE INVITATION"}</span>
        {!copied && <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
      </motion.button>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 py-1.5 px-4 rounded-full bg-[#9B51E0] text-[#F9F6FA] text-[11px] font-medium tracking-wider shadow-lg"
          >
            Invitation link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
