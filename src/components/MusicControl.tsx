"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationConfig } from "@/config/invitation";

interface MusicControlProps {
  autoStart?: boolean;
}

export default function MusicControl({ autoStart = false }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthOscRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);

  // Initialize Web Audio synth fallback if local file fails or for soothing ambient background tune
  const startSynthMusic = () => {
    try {
      if (!synthOscRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.connect(ctx.destination);

        // Upbeat Bollywood-style rhythmic sequence
        const melodyNotes = [
          392.00, 392.00, 440.00, 392.00, // G4 G4 A4 G4
          523.25, 493.88, 0, 0,           // C5 B4 (rest) (rest)
          392.00, 392.00, 440.00, 392.00, // G4 G4 A4 G4
          587.33, 523.25, 0, 0            // D5 C5 (rest) (rest)
        ];
        
        let step = 0;

        const interval = setInterval(() => {
          if (ctx.state === "closed") {
            clearInterval(interval);
            return;
          }
          
          const time = ctx.currentTime;
          
          // Play melody if not a rest
          const freq = melodyNotes[step % melodyNotes.length];
          if (freq > 0) {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();
            
            // Triangle wave for a slightly more plucked/string sound
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, time);

            noteGain.gain.setValueAtTime(0.08, time);
            noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

            osc.connect(noteGain);
            noteGain.connect(gain);

            osc.start(time);
            osc.stop(time + 0.5);
          }

          // Play a basic "dhol/tabla" rhythmic beat (Kick-like sound) on certain steps
          if (step % 4 === 0 || step % 4 === 2 || step % 8 === 7) {
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            
            kickOsc.type = "sine";
            // Frequency drop for a drum hit sound
            kickOsc.frequency.setValueAtTime(150, time);
            kickOsc.frequency.exponentialRampToValueAtTime(0.001, time + 0.3);

            kickGain.gain.setValueAtTime(0.15, time);
            kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

            kickOsc.connect(kickGain);
            kickGain.connect(ctx.destination);

            kickOsc.start(time);
            kickOsc.stop(time + 0.3);
          }

          step++;
        }, 250); // Faster tempo for rhythm

        synthOscRef.current = { ctx, gain };
      } else if (synthOscRef.current.ctx.state === "suspended") {
        synthOscRef.current.ctx.resume();
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopSynthMusic = () => {
    if (synthOscRef.current && synthOscRef.current.ctx.state === "running") {
      synthOscRef.current.ctx.suspend();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
        stopSynthMusic();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasError(true);
            startSynthMusic();
          });
      }
    } else {
      if (isPlaying) {
        stopSynthMusic();
      } else {
        startSynthMusic();
      }
    }
  };

  useEffect(() => {
    if (autoStart) {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked by browser policy, fallback to synth on first click
            startSynthMusic();
          });
      } else {
        startSynthMusic();
      }
    }
  }, [autoStart]);

  return (
    <>
      <audio
        ref={audioRef}
        src={invitationConfig.music.file}
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />

      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3.5 rounded-full bg-[#FDFBFE]/80 backdrop-blur-md border border-[#9B51E0]/40 text-[#9B51E0] shadow-[0_4px_25px_rgba(0, 0, 0, 0.08),0_0_15px_rgba(155, 81, 224,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300"
          aria-label="Toggle Background Music"
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative flex items-center justify-center"
            >
              <Volume2 className="w-5 h-5 text-[#9B51E0]" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5 text-[#6B5B6B]/60" />
          )}

          {/* Glowing pulse ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#9B51E0]/50 animate-ping pointer-events-none opacity-40" />
          )}

          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 py-1 px-3 rounded-full bg-[#FDFBFE]/90 border border-[#9B51E0]/30 text-[11px] tracking-wider text-[#4A1C40] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {isPlaying ? "Pause Music" : "Play Reception Music"}
          </span>
        </motion.button>
      </div>
    </>
  );
}
