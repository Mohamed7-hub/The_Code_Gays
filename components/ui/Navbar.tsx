"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* ── Segmented Nav container ── */}
        <div
          className={`flex items-stretch rounded-xl border transition-all duration-500 w-full max-w-[430px] h-[52px] overflow-hidden ${
            scrolled
              ? "bg-[#080808]/95 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50"
              : "bg-[#080808]/85 backdrop-blur-xl border-white/8"
          }`}
        >
          {/* Logo Compartment */}
          <a
            href="#"
            className="flex items-center justify-center w-[52px] border-r border-white/10 hover:bg-white/5 transition-colors flex-shrink-0 group"
          >
            <div className="w-[30px] h-[30px] rounded-lg overflow-hidden bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.jpg"
                alt="Thecodeguys"
                width={30}
                height={30}
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          {/* CTA Button Compartment */}
          <div className="flex-grow h-full flex items-center justify-center px-3 border-r border-white/10">
            <motion.a
              href="#contact"
              className="relative w-full h-[36px] flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              {/* Left glow edge */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#a8ff3e] via-[#a8ff3e]/70 to-transparent shadow-[0_0_8px_rgba(168,255,62,0.4)]" />

              {/* Animated dotted pattern that moves across */}
              <motion.span
                className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #a8ff3e 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
                animate={{
                  backgroundPosition: ["0 0", "8px 0"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <span className="relative z-10 text-[11px] font-semibold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors duration-300 pl-2">
                Start a project
              </span>
              <span className="relative z-10 text-white/70 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </div>

          {/* Hamburger Compartment */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-[52px] flex items-center justify-center hover:bg-white/5 transition-all duration-300 group flex-shrink-0"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[6px]">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.75 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-[18px] h-[1.5px] bg-white/75 group-hover:bg-white transition-colors duration-300"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3.75 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-[18px] h-[1.5px] bg-white/75 group-hover:bg-white transition-colors duration-300"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* ── Full screen menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl flex flex-col"
          >
            {/* Top bar mirror */}
            <div className="flex items-center justify-end px-8 pt-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Nav links — big */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between py-5 border-b border-white/5 hover:border-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-white/20 text-sm w-8" style={{ fontFamily: "var(--font-display)" }}>
                      0{i + 1}
                    </span>
                    <span
                      className="text-white/70 group-hover:text-white text-4xl font-semibold transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <span className="text-white/20 group-hover:text-[#a8ff3e] transition-colors duration-300 text-xl">→</span>
                </motion.a>
              ))}
            </div>

            {/* Bottom */}
            <div className="px-8 pb-10 flex items-center justify-between">
              <p className="text-white/20 text-xs tracking-widest uppercase">Kampala, Uganda</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}